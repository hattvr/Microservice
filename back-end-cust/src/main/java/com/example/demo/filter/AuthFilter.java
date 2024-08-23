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
    private String auth_scope = "com.example.demo.auth.apis";
	private String api_scope = "com.example.demo.data.apis";
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// get authorization header
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String uri = req.getRequestURI();
		
		System.out.println("AuthFilter running");
		// for development purposes
		// allow turning off auth checking with header tokencheck:false
		String tokenheader = req.getHeader("tokencheck");
		if( tokenheader != null && !tokenheader.equalsIgnoreCase("true") ) {
			chain.doFilter(request, response);
			return;		
		}
		
		// auth checking will not apply to these cases
		// token endpoint
		// user register endpoint
		// healthcheck endpoints on customer api
		System.out.println("\n\n" + uri);
		if(uri.equals("/api/") || uri.startsWith("/account/register")) {
			chain.doFilter(request, response);
			return;
		}
		
		// check JWT token
		String authheader = req.getHeader("authorization");
        System.out.println("authheader: " + authheader);

		if(authheader != null && authheader.length() > 7 && authheader.startsWith("Bearer")) {
			String jwt_token = authheader.substring(7, authheader.length());
			if(JWTHelper.verifyToken(jwt_token)) {
				System.out.println("Token verified");
				String request_scopes = JWTHelper.getScopes(jwt_token);
				if(request_scopes.contains(api_scope) || request_scopes.contains(auth_scope)) {
					chain.doFilter(request, response);
					return;
				}
			}
		}
		
		// continue
		res.sendError(HttpServletResponse.SC_FORBIDDEN, "failed authentication");

	}
}
