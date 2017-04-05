import React, {Component} from 'react';

export class Registration extends Component {
    render() {
        return(
        <div className="container login">
            <div className="row">
                <div className="well well-lg">
                    <h1 className="text-center">Login or Sign Up</h1>
                    <hr/>
                    <form onSubmit={this.props.addUser}>
                        <div className="form-group">
                            <label id="emailLabel">Email:</label>
                            <input type="text" id="userEmail" name="email" onChange={this.props.handleInputChange} placeholder="Email" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label id="passwordLabel">Password:</label>
                            <input type="password" id="userPassword" name="password" onChange={this.props.handleInputChange} placeholder="Password" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label id="confirmPassword">Confirm Your Password:</label>
                            <input type="password" id="userPasswordConfirm" name="passwordConfirm" onChange={this.props.handleInputChange} placeholder="Confirm Your Password" className="form-control"></input>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-success btn-block" type="submit" id="register" onClick={this.props.addUser}>Register</button>
                            {/*<a href="#" id="signUp" onClick={this.props.showRegistration}>Sign Up</a>*/}
                        </div>

                    </form>
                    <div id="errorMessage" className="has-warning">{this.props.errorMessage}</div>
                </div>


            </div>
        </div>

        );
    }
}

export default Registration;