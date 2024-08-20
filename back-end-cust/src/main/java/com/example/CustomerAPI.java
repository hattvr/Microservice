package com.example;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CustomerAPI {
    @Autowired CustomersRepository customerRepo;
    
    @GetMapping()
    public String ping() {
        return "The API is running!";
    }

    @GetMapping("/customers")
    public Iterable<Customer> getCustomers() {
        return customerRepo.findAll();
    }

    @GetMapping("/customers/{id}")
    public Optional<Customer> getCustomerByUsername(@PathVariable long id) {
        return customerRepo.findById(id);
    }
}
