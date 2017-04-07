import React, { Component } from 'react';
import './App.css';
import { Registration } from './Registration';
import Login from './Login'
import Board from './Board'
import ForgotPassword from './ForgotPassword'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {"email": "", "password": ""},
        mode :"Login",
        loginErrorMessage: "",
        errorMessage: ""
    }
    this.addUser = this.addUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postNewUser = this.postNewUser.bind(this);
    this.showRegistration = this.showRegistration.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
  }

  addUser(event) {
      event.preventDefault();
      this.postNewUser();
  }

  loginUser(event){
      event.preventDefault();
      this.logUserIn();
  }

  forgotPassword(){
      const self = this;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const myInit = { method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(this.state.newUser)};
      return fetch('/users/forgotPassword', myInit)
          .then(function(response) {
              console.log(response)
              if(response.status >= 400){
                  console.log("hey im in the bad request")
              //     self.setState({loginErrorMessage: "User not found. Please re-enter your credentials or sign up."})
              //     // this.state.loginErrorMessage = "User not found. Please re-enter your credentials or sign up."
              //     return response
              }
              console.log("forgot password function", response.status)
              self.setState({ mode:"Login"})
              return response;
          });
  }

  logUserIn(){
      const self = this;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const myInit = { method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(this.state.newUser)};
      return fetch('/users/validate', myInit)
          .then(function(response) {
              console.log(response)
              if(response.status >= 400){
                  console.log("hey im in the bad request")
                  self.setState({loginErrorMessage: "User not found. Please re-enter your credentials or sign up."})
                  // this.state.loginErrorMessage = "User not found. Please re-enter your credentials or sign up."
                  return response
              }
              console.log("this shouldnt be here", response.status)
              self.setState({newUser: {"email": "", "password": ""}, mode:"Game"})
              return response;
          });
  }

  postNewUser(){
      const self = this;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const myInit = { method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(this.state.newUser)};
      return fetch('/users', myInit)
          .then(function(response) {
              console.log(response)
              if(response.status === 400){
                  self.setState({errorMessage: "This email has already been used.  Please use a different email or click forgot password to recover your account."})
                  return response
              }
              self.setState({newUser: {"email": "", "password": ""}, mode:"Game"})
              return response;
          });
  }

  showRegistration() {
      this.setState({mode: "Registration"})
  }

   showForgotPassword() {
        this.setState({mode: "ForgotPassword"})
    }

  handleInputChange(event) {
    const updatedUser = this.state.newUser;
    updatedUser[event.target.name] = event.target.value
    this.setState({newUser: updatedUser})
  }

    get display(){

        switch(this.state.mode.toLowerCase()){
            case "registration": return <Registration addUser={this.addUser} handleInputChange={this.handleInputChange} errorMessage={this.state.errorMessage}/>
            case "login" : return <Login showRegistration={this.showRegistration} loginUser={this.loginUser} showForgotPassword={this.showForgotPassword} handleInputChange={this.handleInputChange} loginErrorMessage={this.state.loginErrorMessage} />
            case "forgotpassword": return <ForgotPassword forgotPassword={this.forgotPassword} />
            case "game" : return <Board />
            default:
                return <div />
        }
    }

  render() {
    return (
      <div id="app">
          {this.display}
      </div>
    );
  }
}

export default App;
