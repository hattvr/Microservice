package com.example.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountApi {

    @GetMapping("/")
    public String checkConnection() {
        return "Authentication API Controller is online!";
    }

}
