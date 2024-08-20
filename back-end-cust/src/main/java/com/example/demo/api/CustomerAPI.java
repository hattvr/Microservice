package com.example.demo.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.CustomerEntity;
import com.example.demo.dao.CustomerRepository;

@RestController
public class CustomerAPI {
    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/")
    public String checkConnection() {
        return "Customer API Controller is online!";
    }

    @GetMapping("/customers")
    public Iterable<CustomerEntity> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/customers/{id}")
    public Optional<CustomerEntity> getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id);
    }
}
