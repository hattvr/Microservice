import "../App.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserLoginForm } from "../UserLoginForm";

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

		navigate("/customers");
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
