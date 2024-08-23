package com.example.demo.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Customer;
import com.example.demo.domain.CustomerFactory;
import com.example.demo.domain.Token;
import com.example.demo.util.JWTHelper;

@CrossOrigin
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

        Token token = createToken("ApiClientApp");
        ResponseEntity<?> response = ResponseEntity.ok(token);
        return response;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        System.out.println("register running");
        String name = customer.getName();
        String email = customer.getEmail();
        String password = customer.getPassword();
        String role = customer.getRole();

        if (name == null || email == null || password == null || role == null
        || name.length() == 0 || email.length() == 0 || password.length() == 0 || role.length() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    
        try {
            URL url = new URL("http://localhost:8080/api/customers");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
    
            Token token = getAppUserToken();
            conn.setRequestProperty("Authorization", "Bearer " + token.getToken());
            conn.setDoOutput(true);
    
            String input = "{\"name\":\"" + name 
            + "\",\"email\":\"" + email 
            + "\",\"password\":\"" 
            + password + "\",\"role\":\"" 
            + role 
            + "\"}";

            conn.getOutputStream().write(input.getBytes());
    
            System.out.println("response code: " + conn.getResponseCode());
    
            if (conn.getResponseCode() != 200) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity.status(HttpStatus.CREATED).build();
            }
    
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    private boolean verifyCredentials(String email, String password) {
        // System.out.println("verifyCredentials running");
        
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
        String scopes = "com.example.demo.data.apis";
    	// special case for application user
    	if( username.equalsIgnoreCase("ApiClientApp")) {
    		scopes = "com.example.demo.auth.apis";
    	}
    	String token_string = JWTHelper.createToken(scopes);
        
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
