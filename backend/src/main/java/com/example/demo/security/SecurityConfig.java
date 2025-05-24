package com.example.demo.security;

import com.example.demo.filter.SsoSessionFilter;
import com.example.demo.filter.SsoTokenFilter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Value("${app.security.enabled:true}")
    private boolean enableSecurity;

    @Value("${app.security.sso-filter:false}")
    private boolean enableSsoFilter;

    @Value("${auth.method:token}")
    private String authMethod;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        http.csrf(cs -> cs.disable());

        // 如果打開 SSO filter，會根據選擇哪一個 filter
        if (enableSsoFilter) {
            SessionCreationPolicy policy = "session".equalsIgnoreCase(authMethod)
                ? SessionCreationPolicy.IF_REQUIRED
                : SessionCreationPolicy.STATELESS;

            http.sessionManagement(sm -> sm.sessionCreationPolicy(policy));

            if ("session".equalsIgnoreCase(authMethod)) {
                http.addFilterBefore(
                    new SsoSessionFilter(),
                    UsernamePasswordAuthenticationFilter.class
                );
            } else {
                http.addFilterBefore(
                    new SsoTokenFilter(),
                    UsernamePasswordAuthenticationFilter.class
                );
            }
        }

        // enableSecurity 決定是否做驗證
        if (!enableSecurity) {
            http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        } else {
            http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated());

            // 如果沒有使用 SSO filter，就走 oauth2Login
            if (!enableSsoFilter) {
                http.oauth2Login(oauth2 -> oauth2.defaultSuccessUrl("/", true));
            }
        }

        return http.build();
    }
}
