package com.example.demo.security;

import java.util.*;

import com.example.demo.filter.SsoSessionFilter;
import com.example.demo.filter.SsoTokenFilter;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableConfigurationProperties(SecurityProperties.class)
public class SecurityConfig {

    private final SecurityProperties props;

    public SecurityConfig(SecurityProperties props) {
        this.props = props;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(props.getAllowedOrigins());
        cfg.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", cfg);
        return src;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthMode mode = props.getMode();

        http.csrf(cs -> cs.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.authorizeHttpRequests(auth -> auth
            .requestMatchers(
                "/", 
                "/index.html",
                "/css/**", "/js/**", "/images/**", "/favicon.ico",
                "/login", "/login/**"
            ).permitAll()
            .requestMatchers("/hello").hasRole("admin")
            .anyRequest().authenticated()
        );

        // SSO Session or Token Filter
        if (mode == AuthMode.SSO_SESSION) {
            http.sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            );
            http.addFilterBefore(
                new SsoSessionFilter(),
                UsernamePasswordAuthenticationFilter.class
            );

            // **啟用 formLogin，綁定到 /login**
            http.formLogin(form -> form
                .loginPage("/login")            // GET /login
                .loginProcessingUrl("/login")   // POST /login
                .defaultSuccessUrl("/", true)
                .permitAll()
            );

        } else if (mode == AuthMode.SSO_TOKEN) {
            http.sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
            http.addFilterBefore(
                new SsoTokenFilter(),
                UsernamePasswordAuthenticationFilter.class
            );
        }

        if (mode == AuthMode.JWT) {
            http.oauth2ResourceServer(rs -> rs
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            );
        } else if (mode == AuthMode.OIDC) {
            http.oauth2Login(oauth2 ->
                oauth2.defaultSuccessUrl("/", true)
            );
        }

        return http.build();
    }


    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter conv = new JwtAuthenticationConverter();
        conv.setJwtGrantedAuthoritiesConverter(jwt -> {
            // realm_access.roles
            List<String> realmRoles = Optional.ofNullable(jwt.getClaimAsMap("realm_access"))
                .map(m -> m.get("roles"))
                .filter(r -> r instanceof Collection)
                .map(r -> ((Collection<?>) r).stream()
                          .map(Object::toString)
                          .toList())
                .orElse(List.of());

            // resource_access.react-client.roles
            List<String> clientRoles = Optional.ofNullable(jwt.getClaimAsMap("resource_access"))
                .map(m -> m.get("react-client"))
                .filter(c -> c instanceof Map)
                .map(c -> (Map<?,?>) c)
                .map(cm -> cm.get("roles"))
                .filter(r -> r instanceof Collection)
                .map(r -> ((Collection<?>) r).stream()
                          .map(Object::toString)
                          .toList())
                .orElse(List.of());

            List<GrantedAuthority> auths = new ArrayList<>();
            realmRoles.forEach(r -> auths.add(new SimpleGrantedAuthority("ROLE_" + r)));
            clientRoles.forEach(r -> auths.add(new SimpleGrantedAuthority("ROLE_" + r)));
            return auths;
        });
        return conv;
    }
}
