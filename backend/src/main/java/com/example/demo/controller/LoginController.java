package com.example.demo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.UUID;

@Controller
public class LoginController {

    @Value("${auth.method:token}")
    private String authMethod;

    @GetMapping("/login")
    @ResponseBody
    public String loginForm(@RequestParam Optional<String> from) {
        String dest = from.orElse("/");
        return "<html><body>"
             + "<form method='post' action='/login?from=" +
               URLEncoder.encode(dest, StandardCharsets.UTF_8) + "'>"
             + "Username: <input name='username'/><br/>"
             + "Password: <input name='password' type='password'/><br/>"
             + "<button type='submit'>Login</button>"
             + "</form></body></html>";
    }

    @PostMapping("/login")
    public void doLogin(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam Optional<String> from,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        if (!"user".equals(username) || !"pass".equals(password)) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Invalid credentials");
            return;
        }

        if ("session".equalsIgnoreCase(authMethod)) {
            HttpSession session = request.getSession(true);
            session.setAttribute("LOGIN_USER", username);
        } else {
            String token = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("SSO_TOKEN", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(3600);
            response.addCookie(cookie);
        }

        String dest = from.orElse("/");
        String redirectTo = "/login".equals(dest) ? "/" : dest;
        response.sendRedirect(redirectTo);
    }
}
