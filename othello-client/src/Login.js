/**
 * Created by localadmin on 4/4/17.
 */
import React, {Component} from 'react';
import './login.css'

export class Login extends Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="Panel panel-login">
                            {/*<div className="panel-heading">*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-xs-6">*/}
                                        {/*<a href="#" className="active" id="loginForm">Login</a>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-xs-6">*/}
                                        {/*<a href="#" id="register-form-link">Register</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<hr/>*/}
                            {/*</div>*/}
                            {/*<div className="panel-body">*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-lg-12">*/}
                                        {/*<form onSubmit={this.props.addUser}>*/}
                                            {/*<div className="form-group">*/}
                                                {/*<label id="emailLabel">Email:</label>*/}
                                                {/*<input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange} className="form-control"></input>*/}
                                            {/*</div>*/}
                                            {/*<div className="form-group">*/}
                                                {/*<label id="passwordLabel">Password:</label>*/}
                                                {/*<input type="password" id="userPassword" name="password" onChange={this.props.handleInputChange} className="form-control"></input>*/}
                                            {/*</div>*/}
                                            {/*<div className="form-group">*/}
                                                {/*<div className="row">*/}
                                                    {/*<div className="col-sm-6 col-sm-offset-3">*/}
                                                        {/*<input type="submit" name="login" id="login" tabIndex="4" className="form-control btn btn-login" value="Log In"></input>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}

                                        {/*</form>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                <form onSubmit={this.props.logUserIn}>
                    <label id="emailLabel">Email:</label>
                    <input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange}></input>
                    <label id="passwordLabel">Password:</label>
                    <input type="password" id="userPassword" name="password" onChange={this.props.handleInputChange}></input>
                    <button type="submit" id="login" onClick={this.props.logUserIn}>Login</button>
                    <button type="submit" id="signUp" onClick={this.props.showRegistration}>Sign Up</button>
                </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;