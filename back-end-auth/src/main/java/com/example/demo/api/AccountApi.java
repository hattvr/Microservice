package com.example.demo.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.example.demo.domain.Customer;
import com.example.demo.domain.CustomerFactory;
import com.example.demo.domain.Token;

@RestController
public class AccountApi {

    public static Token appUserToken;

    @GetMapping("/")
    public String checkConnection() {
        return "Authentication API Controller is online!";
    }

    @PostMapping("/token")
    public ResponseEntity<?> requestToken(@RequestBody Customer customer) {
        String email = customer.getEmail();
		String password = customer.getPassword();
        System.out.println("email: " + email + "\n" + "password: " + password);
        if (email == null || password == null
        || email.length()==0 || password.length()==0
        || !verifyCredentials(email, password)) return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();

        // Long id = getCustomerByEmail(email).getId();
        // Token token = createToken(id);
        // ResponseEntity<?> response = ResponseEntity.ok(token);
        // return response;
    }

    private boolean verifyCredentials(String email, String password) {
        System.out.println("verifyCredentials running");
        // special case for application user
		if(email.equals("me@me.com") && password.equals("secret")) {
			return true;
		}

        Customer customer = getCustomerByEmail(email);

        if (customer != null && customer.getEmail().equals(email) && customer.getPassword().equals(password)) {
            System.out.println("verified");
            return true;
        }
        System.out.println("not verified");
        return false;
    }

    private static Token getAppUserToken() {
		if(appUserToken == null || appUserToken.getToken() == null || appUserToken.getToken().length() == 0) {
			appUserToken = createToken("ApiClientApp");
		}
		return appUserToken;
	}

    private static Token createToken(String username) {
        //TODO scopes
        // String scopes = "com.example.demo.apis";
        // // special case for application user
        // if( username.equalsIgnoreCase("ApiClientApp")) {
        //     scopes = "com.webage.auth.apis";
        // }
        String token_string = null;
        try {
		    Algorithm algorithm = Algorithm.HMAC256("secret");
		    long fiveHoursInMillis = 1000 * 60 * 60 * 5;
		    Date expireDate = new Date(System.currentTimeMillis() + fiveHoursInMillis);
		    token_string = JWT.create()
		    	.withSubject("apiuser")
		        .withIssuer("me@me.com")
		        // .withClaim("scopes", scopes)
		        .withExpiresAt(expireDate)
		        .sign(algorithm);
		} catch (JWTCreationException exception){
			return null;
		}
        
        if (token_string == null) return null;

        return new Token(token_string);
    }

    private Customer getCustomerByEmail(String email) {
        //Call Customer API and get customer object
        try {
			URL url = new URL("http://localhost:8080/api/customers/byemail/" + email);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");
			Token token = getAppUserToken();
			conn.setRequestProperty("authorization", "Bearer " + token.getToken());

			if (conn.getResponseCode() != 200) {
				return null;
			} else {
				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
				String output = "";
				String out = "";
				while ((out = br.readLine()) != null) {
					output += out;
				}
				conn.disconnect();
				return CustomerFactory.getCustomer(output);
			}

		} catch (Exception e) {
			e.printStackTrace();
            return null;
        }
    }
}
