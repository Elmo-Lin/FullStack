package com.example.demo.security;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.security")
public class SecurityProperties {

    private AuthMode mode = AuthMode.OFF;

    private List<String> allowedOrigins = List.of("http://localhost:3000");

    public AuthMode getMode() { return mode; }
    public void setMode(AuthMode mode) { this.mode = mode; }

    public List<String> getAllowedOrigins() { return allowedOrigins; }
    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }
}
