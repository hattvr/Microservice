export function UserRegisterForm(parameters) {
    return (
        <div class="login-container">
            <div class="login-form">
                <h1>Register</h1>
                <div>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="your name" 
                        class="login-input"
                        onChange={ (e) => parameters.handleRegisterChange(e) }
                        value={parameters.formObject.name} 
                    />

                    <input 
                        type="email"
                        name="email"
                        placeholder="someone@email.com"
                        class="login-input"
                        onChange={ (e) => parameters.handleRegisterChange(e) }
                        value={parameters.formObject.email} 
                    />

                    <input 
                        type="text" 
                        name="password"
                        placeholder="supersecurepassword" 
                        class="login-input"
                        onChange={ (e) => parameters.handleRegisterChange(e) }
                        value={parameters.formObject.password} 
                    />

                    <select 
                        name="role"
                        onChange={(e) => parameters.handleRegisterChange(e)}
                        value={parameters.formObject.role}
                        className="register-role-select"
                    >
                        <option value="" disabled>Select role</option>
                        <option value="user">Default User</option>
                        <option value="admin">Administrator</option>
                    </select>

                    <button 
                        onClick={parameters.onRegisterClick} 
                        className="button login-button"
                    >
                        Register
                    </button>

                    <h6>
                        Already have an account?
                        <br></br>
                        <a href="/" style={{ color: "green" }}>
                            Login Here!
                        </a>
                    </h6>
                </div>
            </div>

            <div class="login-image-container">
                <img 
                    src="./register_art.png" 
                    alt="profile" 
                    class="login-page-image" 
                />
            </div>
        </div>
    );
}