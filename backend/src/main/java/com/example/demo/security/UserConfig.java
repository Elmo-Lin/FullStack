package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class UserConfig {

    // 1. 注册 DelegatingPasswordEncoder（包含 bcrypt、noop、pbkdf2…等）
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // 2. 注册一个 InMemoryUserDetailsManager，并在创建用户时用上面那个 encoder
    @Bean
    public UserDetailsService users(PasswordEncoder passwordEncoder) {
        // 在用户密码前加 {bcrypt}、{noop}…前缀由 DelegatingPasswordEncoder 自动处理
        String encodedPass = passwordEncoder.encode("demoPass");

        var user = User.withUsername("demoUser")
            .password(encodedPass)
            .roles("USER")
            .build();

        return new InMemoryUserDetailsManager(user);
    }
}
