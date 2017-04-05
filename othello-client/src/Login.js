import React, {Component} from 'react';
import './App.css'

export class Login extends Component {
    render() {
        return(
            <div className="container login">
                <div className="row">
                    <div className="well well-lg">
                        <h1 className="text-center">Login or Sign Up</h1>
                        <hr/>
                        <form onSubmit={this.props.logUserIn}>
                            <div className="form-group">
                                <label id="emailLabel">Email:</label>
                                <input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange} placeholder="Email" className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label id="passwordLabel">Password:</label>
                                <input type="password" id="userPassword" name="password" onChange={this.props.handleInputChange} placeholder="Password" className="form-control"></input>
                                <a href="#" id="forgotPassword">Forgot Password?</a>
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-success btn-block" type="submit" id="login" onClick={this.props.logUserIn}>Login</button>
                            </div>

                        </form>
                        <a href="#" id="signUp" onClick={this.props.showRegistration}>Sign Up</a>
                        {console.log("error message", this.props.errorMessage)}
                        <div id="errorMessage" className="has-warning">{this.props.errorMessage}</div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Login;