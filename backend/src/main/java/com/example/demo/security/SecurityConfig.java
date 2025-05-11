package com.example.demo.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Value("${app.security.enabled:true}")
    private boolean enableSecurity;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        if (enableSecurity) {
            http
                .authorizeHttpRequests(auth -> auth
                    .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                    .defaultSuccessUrl("/", true)
                );
        } else {
            http
                .authorizeHttpRequests(auth -> auth
                    .anyRequest().permitAll()
                )
                .csrf(csrf -> csrf.disable());
        }

        return http.build();
    }
}
