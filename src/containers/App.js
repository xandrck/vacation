import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import Persons from '../components/Persons/Persons';
import Request from 'superagent'

class App extends Component {
  constructor() {
    super();

    this.state = {
      persons: []
    };

    this.setStateHandler = this.setStateHandler.bind(this);
  };

  componentDidMount() {
    this.setStateHandler();
  }

  setStateHandler(){
    const url = 'http://localhost:3001/v1/users';
    Request.get(url).set('accept', 'json').then((response) => {
      this.setState({
        persons: response.body
      })
    })
  }

  render() {
    let persons = this.state.persons;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Users:</h1>
        <div>
          <Persons persons={persons}/>
        </div>
        <h1>Calendar:</h1>

      </div>
    );
  }
}

export default App;
