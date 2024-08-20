package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
    List<Customer> customers = new ArrayList<Customer>();

    public CustomerController() {
        Customer customer1 = new Customer("John Doe", "john@gmail.com", "user", 1);
        Customer customer2 = new Customer("Jane Doe", "jane@gmail.com", "user", 2);
        Customer customer3 = new Customer("Zaeem", "zaeem@gmail.com", "admin", 3);

        customers.add(customer1);
        customers.add(customer2);
        customers.add(customer3);
    }

    @GetMapping("/")
    public String checkConnection() {
        return "Customer API Controller is online!";
    }

    @GetMapping("/customers")
    public String getAllCustomers() {
        String allCustomers = "";

        for (Customer customer : customers) {
            allCustomers += customer.toString() + "\n";
        }

        return allCustomers;
    }

    @GetMapping("/customers/{id}")
    public String getCustomerById(@PathVariable int id) {
        for (Customer customer : customers) {
            if (customer.getId() == id) {
                return customer.toString();
            }
        }

        return "Customer not found!";
    }
}
