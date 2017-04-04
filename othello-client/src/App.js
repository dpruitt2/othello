import React, { Component } from 'react';
import './App.css';
import { Registration } from './Registration';
import Login from './Login'
import Board from './Board'

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
    this.logUserIn = this.logUserIn.bind(this);
  }

  addUser(event) {
      event.preventDefault();
      this.postNewUser();

  }

  logUserIn(event){
      event.preventDefault();
      this.setState({mode: "Game"})
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
              self.setState({newUser: {"email": "", "password": ""}, mode:"Game"})
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
            case "login" : return <Login showRegistration={this.showRegistration} logUserIn={this.logUserIn} handleInputChange={this.handleInputChange} />
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
