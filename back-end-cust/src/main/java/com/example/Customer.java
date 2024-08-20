package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="CUSTOMERS")
public class Customer {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String username;

    private String pwd;
    
    private String role; //ADMIN or CUSTOMER

    protected Customer() {}

    public Customer(String username, String pwd, String role) {
        this.username = username;
        this.pwd = pwd;
        this.role = role;
    }

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
