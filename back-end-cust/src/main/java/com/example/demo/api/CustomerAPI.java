package com.example.demo.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.CustomerEntity;
import com.example.demo.dao.CustomerRepository;

@CrossOrigin(maxAge = 3600)
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

    // Read Operation
    @GetMapping("/customers/{id}")
    public Optional<CustomerEntity> getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id);
    }

    // Create Operation
    @PostMapping("/customers")
    public CustomerEntity createCustomer(@RequestBody CustomerEntity customer) {
        return customerRepository.save(customer);
    }

    // Update Operation
    @PutMapping("/customers/{id}")
    public CustomerEntity updateCustomer(@PathVariable Long id, @RequestBody CustomerEntity customer) {
        Optional<CustomerEntity> customerOptional = customerRepository.findById(id);
        if (customerOptional.isPresent()) {
            CustomerEntity customerToUpdate = customerOptional.get();
            customerToUpdate.setName(customer.getName());
            customerToUpdate.setEmail(customer.getEmail());
            customerToUpdate.setPassword(customer.getPassword());
            customerToUpdate.setRole(customer.getRole());
            return customerRepository.save(customerToUpdate);
        } else {
            return null;
        }
    }

    // Delete Operation
    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerRepository.deleteById(id);
    }
}
