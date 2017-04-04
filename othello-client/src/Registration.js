import React, {Component} from 'react';

export class Registration extends Component {
    render() {
        return(
        <form onSubmit={this.props.addUser}>
            <label id="emailLabel">Email:</label>
            <input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange}></input>
            <label id="passwordLabel">Password:</label>
            <input type="password" id="userPassword" name="password" onChange={this.props.handleInputChange}></input>
            <label id="confirmPassword">Confirm Your Password:</label>
            <input type="password" id="userPasswordConfirm" name="passwordConfirm" onChange={this.props.handleInputChange}></input>
            <button type="submit" id="register" >Register</button>
        </form>
        );
    }
}

export default Registration;