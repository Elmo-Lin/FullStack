package com.example.demo.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class SsoSessionFilter extends OncePerRequestFilter {

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

        HttpSession session = req.getSession(false);
        boolean loggedIn = (session != null
                            && session.getAttribute("LOGIN_USER") != null);

        if (loggedIn) {
            chain.doFilter(req, res);
        } else {
            String from = URLEncoder.encode(req.getRequestURI(), StandardCharsets.UTF_8);
            res.sendRedirect("/login?from=" + from);
        }
    }
}
