import "../App.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserLoginForm } from "../UserLoginForm";
import { getToken } from "../restauth";

function LoginPage() {
	let emptyLogin = { id: -1, email: "", password: "" };
	const [formObject, setFormObject] = useState(emptyLogin);
	const navigate = useNavigate(); // Initialize useNavigate

	const handleLoginChange = function (event) {
		console.log("in handleInputChange()");
		const name = event.target.name;
		const value = event.target.value;
		let newFormObject = { ...formObject };
		newFormObject[name] = value;
		setFormObject(newFormObject);
	};

	let onLoginClick = function () {
		console.log("in onLoginClick()");

		// Require name, email, and password fields
		if (
			formObject.email === "" ||
			formObject.password === ""
		) {
			alert("Please fill out all required fields!");
			return;
		}

		console.log("formObject: ", formObject);

		getToken(formObject).then((data) => {
			console.log("data: ", data);
			if (data.token) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("email", formObject.email);
				navigate("/customers");
			} else {
				alert("Invalid email or password!");
			}
		});
	};

	return (
		<div className="App" style={{ padding: "50px" }}>
			<UserLoginForm
				handleLoginChange={handleLoginChange}
				onLoginClick={onLoginClick}
				formObject={formObject}
			/>
		</div>
	);
}

export default LoginPage;
