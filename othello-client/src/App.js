import React, { Component } from 'react';
import './App.css';
import { Registration } from './Registration';
import Login from './Login'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {"email": "", "password": ""},
        mode :"Login"
    }
    this.addUser = this.addUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postNewUser = this.postNewUser.bind(this);
    this.showRegistration = this.showRegistration.bind(this);
  }

  addUser(event) {
      event.preventDefault();
      this.postNewUser();

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
              self.setState({newUser: {"email": "", "password": ""}, mode:"Index"})
              return response;
          });
  }

  showRegistration() {
      this.setState({mode: "Registration"})
  }

  handleInputChange(event) {
    const updatedUser = this.state.newUser;
    updatedUser[event.target.name] = event.target.value
    this.setState({newUser: updatedUser})
  }

    get display(){

        switch(this.state.mode.toLowerCase()){
            case "registration": return <Registration addUser={this.addUser} handleInputChange={this.handleInputChange}/>
            case "login" : return <Login showRegistration={this.showRegistration} handleInputChange={this.handleInputChange} />
            case "index" : return <div id="index"/>
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
