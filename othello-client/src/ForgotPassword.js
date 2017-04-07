import React, {Component} from 'react';
import './App.css'

export class ForgotPassword extends Component {
    render() {
        return(
            <div className="container login">
                <div className="row">
                    <div className="well well-lg">
                        <h1 className="text-center">Please Enter your Email</h1>
                        <hr/>
                        <form onSubmit={this.props.forgotPassword}>
                            <div className="form-group">
                                <label id="emailLabel">Email:</label>
                                <input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange} placeholder="Email" className="form-control"></input>
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-success btn-block" type="submit" id="login" onClick={this.props.forgotPassword}>Submit</button>
                            </div>

                        </form>
                        <a href="#" id="signUp" onClick={this.props.showRegistration}>Sign Up</a>
                    </div>


                </div>
            </div>
        );
    }
}

export default ForgotPassword;
