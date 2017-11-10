import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import Persons from '../components/Persons/Persons';
import Vacations from '../components/Vacations/Vacations';
import Request from 'superagent'

class App extends Component {
  constructor() {
    super();

    this.state = {
      persons: [],
      vacations: []
    };

    this.setStatePersons = this.setStatePersons.bind(this);
    this.setStateVacations = this.setStateVacations.bind(this);
  };

  componentDidMount() {
    this.setStatePersons();
    this.setStateVacations(1);
  }

  setStatePersons(){
    const url = 'http://localhost:3001/v1/users';
    Request.get(url).set('accept', 'json').then((response) => {
      this.setState({
        persons: response.body
      })
    })
  }

  setStateVacations(personId){
    const url = 'http://localhost:3001/v1/users/' + personId;
    Request.get(url).set('accept', 'json').then((response) => {
      this.setState({
        vacations: response.body
      })
    })
  }

  render() {
    let persons = this.state.persons;
    let vacations = this.state.vacations;

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
        <div>
          <Vacations vacations={vacations}/>
        </div>

      </div>
    );
  }
}

export default App;
