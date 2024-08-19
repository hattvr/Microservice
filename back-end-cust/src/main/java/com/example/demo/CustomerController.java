package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    @GetMapping("/")
    public String checkConnection() {
        return "Customer API Controller is online!";
    }

    @GetMapping("/customers")
    public String getAllCustomers() {
        return "Here's your beautiful list of all the customers!";
    }

    @GetMapping("/customers/{id}")
    public String getCustomerById() {
        return "Here's the customer with the id you requested!";
    }
}
