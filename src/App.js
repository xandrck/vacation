import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Olexandr', days: 20 },
      { name: 'Victor', days: 21 }
    ]
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Users:</h1>
	      {
	        this.state.persons.map((person) =>
            <Person name={person['name']} days={person['days']}/>
          )
	      }
	      <h1>Calendar:</h1>

      </div>
    );
  }
}

export default App;
