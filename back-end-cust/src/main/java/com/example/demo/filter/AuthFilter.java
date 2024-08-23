package com.example.demo.filter;

import java.io.IOException;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.demo.util.JWTHelper;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(1)
public class AuthFilter implements Filter {
    private final String authScope = "com.example.demo.auth.apis";
    private final String apiScope = "com.example.demo.data.apis";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        String uri = req.getRequestURI();

        System.out.println("AuthFilter running: " + uri);

        // Check JWT token
        String authHeader = req.getHeader("Authorization");
        if (authHeader == null) {
            authHeader = req.getHeader("authorization"); // Case-insensitive check
        }

        System.out.println("Authorization header: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7); // Extract the token

            if (JWTHelper.verifyToken(jwtToken)) {
                System.out.println("Token verified");
                String requestScopes = JWTHelper.getScopes(jwtToken);
                if (requestScopes.contains(apiScope) || requestScopes.contains(authScope)) {
                    chain.doFilter(request, response);
                    return;
                }
            } else {
                System.out.println("Token verification failed");
            }
        } else {
            System.out.println("Authorization header is missing or doesn't start with Bearer");
        }

        // If we reach here, authentication failed
        res.sendError(HttpServletResponse.SC_FORBIDDEN, "Failed authentication");
    }
}
