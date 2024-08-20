package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	// @Bean
	// public CommandLineRunner demo(CustomerDao customerDao) {
	// 	return (args) -> {
	// 		customerDao.save(new Customer("username", "pwd", "admin"));
	// 	};
	// }
}
