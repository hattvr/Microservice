import "../App.css";

import React, { useState } from "react";

import { UserRegisterForm } from "../UserRegisterForm";
import { registerAccount } from "../rest/index";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function RegisterPage() {
	let emptyRegister = { id: -1, name: "", email: "", password: "", role: "" };
	const [formObject, setFormObject] = useState(emptyRegister);
	const navigate = useNavigate(); // Initialize useNavigate

	const handleRegisterChange = function (event) {
		console.log("in handleInputChange()");
		const name = event.target.name;
		const value = event.target.value;
		let newFormObject = { ...formObject };
		newFormObject[name] = value;
		setFormObject(newFormObject);
	};

	let onRegisterClick = function () {
		console.log("in onRegisterClick()");
		
		// Require name, email, and password fields
		if (
			formObject.name === "" ||
			formObject.email === "" ||
			formObject.password === ""
		) {
			alert("Please fill out all required fields!");
			return;
		}

		// Default to "user" role, so inputting data in this field isn't required
		if (formObject.role !== "user" && formObject.role !== "admin") {
			formObject.role = "user";
		}

		console.log("formObject: ", formObject);
		registerAccount(formObject);
        
        navigate("/"); // Redirect to login page
        alert("Account registered successfully! Please login using your new credentials.");
	};

	return (
		<div className="App" style={{ padding: "50px" }}>
			<UserRegisterForm
				handleRegisterChange={handleRegisterChange}
				onRegisterClick={onRegisterClick}
				formObject={formObject}
			/>
		</div>
	);
}

export default RegisterPage;
