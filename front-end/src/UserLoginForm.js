export function UserLoginForm(parameters) {
    return (
        <div class="login-container">
            <div class="login-form">
                <h1>Login</h1>
                <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="someone@email.com"
                        class="login-input"
                        onChange={ (e) => parameters.handleLoginChange(e) }
                        value={parameters.formObject.email} 
                    />

                    <input 
                        type="text" 
                        name="password"
                        placeholder="supersecurepassword" 
                        class="login-input"
                        onChange={ (e) => parameters.handleLoginChange(e) }
                        value={parameters.formObject.password} 
                    />

                    <button 
                        onClick={parameters.onLoginClick} 
                        className="button login-button"
                    >
                        Login
                    </button>

                    <h6>
                        Don't have an account?
                        <br></br>
                        <a href="/register" style={{ color: "green" }}>
                            Register Here!
                        </a>
                    </h6>
                </div>
            </div>

            <div class="login-image-container">
                <img 
                    src="./login_art.png" 
                    alt="profile" 
                    class="login-page-image" 
                />
            </div>
        </div>
    );
}