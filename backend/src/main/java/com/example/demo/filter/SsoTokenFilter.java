package com.example.demo.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Optional;

public class SsoTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {
        String path = req.getServletPath();
        if (path.startsWith("/login") ||
            path.startsWith("/css") ||
            path.startsWith("/js") ||
            path.startsWith("/images") ||
            path.startsWith("/test")) {
            chain.doFilter(req, res);
            return;
        }

        String token = Arrays.stream(Optional.ofNullable(req.getCookies()).orElse(new Cookie[0]))
            .filter(c -> "SSO_TOKEN".equals(c.getName()))
            .map(Cookie::getValue)
            .findFirst()
            .orElse(null);

        if (token != null /* && tokenService.isValid(token) */) {
            chain.doFilter(req, res);
        } else {
            String from = URLEncoder.encode(req.getRequestURI(), StandardCharsets.UTF_8);
            res.sendRedirect("/login?from=" + from);
        }
    }
}
