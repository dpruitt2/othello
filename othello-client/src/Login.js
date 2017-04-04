/**
 * Created by localadmin on 4/4/17.
 */
import React, {Component} from 'react';

export class Login extends Component {
    render() {
        return(
            <form onSubmit={this.props.addUser}>
                <label id="emailLabel">Email:</label>
                <input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange}></input>
                <label id="passwordLabel">Password:</label>
                <input type="password" id="userPassword" name="password" onChange={this.props.handleInputChange}></input>
                <button type="submit" id="login">Login</button>
                <button type="submit" id="signUp" onClick={this.props.showRegistration}>Sign Up</button>
            </form>
        );
    }
}

export default Login;