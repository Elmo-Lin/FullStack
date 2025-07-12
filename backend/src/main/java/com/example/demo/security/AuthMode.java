package com.example.demo.security;

public enum AuthMode {
    OFF,          // 完全不啟用安全機制
    SSO_SESSION,  // 用 Session-based SSO Filter
    SSO_TOKEN,    // 用 Token-based   SSO Filter
    JWT,          // JWT Resource Server
    OIDC          // OAuth2 Login (OIDC)
}
