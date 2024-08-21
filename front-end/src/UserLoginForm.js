export function UserLoginForm(parameters) {
    return (
        <table className="customer-table-editor">
            <caption><b>Login Page</b></caption>
            <tbody>
                <tr>
                <td>Email:</td>
                <td><input 
                    type="email"
                    name="email"
                    placeholder="someone@email.com" 
                    onChange={ (e) => parameters.handleLoginChange(e) }
                    value={parameters.formObject.email} 
                /></td>
                </tr>

                <tr>
                <td>Pass:</td>
                <td><input 
                    type="text" 
                    name="password"
                    placeholder="supersecurepassword" 
                    onChange={ (e) => parameters.handleLoginChange(e) }
                    value={parameters.formObject.password} 
                /></td>
                </tr>
                
                <tr>
                <td colSpan="2">
                    <button onClick={parameters.onLoginClick} className="button login-button">Login</button>
                </td>
                </tr>
            </tbody>
        </table>
    );
}