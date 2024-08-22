import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log("User logged out");

		localStorage.removeItem("token");
		localStorage.removeItem("email");

		navigate("/");
	};

	return (
		<button
			onClick={handleLogout}
            className="logout-button"
		>
			Logout
		</button>
	);
}

export default LogoutButton;
