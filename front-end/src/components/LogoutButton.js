import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Perform any logout logic here, e.g., clearing tokens or session data
		console.log("User logged out");

		// Redirect to the login page
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
