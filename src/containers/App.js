import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from '../images/logo.svg';
import '../assets/App.css';
import Persons from '../components/Persons/Persons';
import Vacations from '../components/Vacations/Vacations';
import Request from 'superagent'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      persons: [],
      vacations: [],
      startDate: moment(),
      endDate: moment(),
      currentPerson: {}
    };

    this.setStatePersons = this.setStatePersons.bind(this);
    this.setStateVacations = this.setStateVacations.bind(this);
    this.addVacation = this.addVacation.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.availableVacationDays = this.availableVacationDays.bind(this);
  };

  componentDidMount() {
    this.setStatePersons();
  }

  setStatePersons() {
    const url = 'http://localhost:3001/v1/users';
    Request.get(url).set('accept', 'json').then((response) => {
      this.setState({
        persons: response.body
      })
    })
  };

  setStateVacations(element) {
    let personId = element.target.id;
    const url = 'http://localhost:3001/v1/users/' + personId;
    Request.get(url).set('accept', 'json').then((response) => {
      this.setState({
        vacations: response.body,
        currentPerson: { id: personId, days: this.availableVacationDays(personId) }
      })
    });
  };

  addVacation() {
    let personId = this.state.currentPerson;
    let startDate = this.state.startDate.format("DD-MM-YYYY");
    let endDate = this.state.endDate.format("DD-MM-YYYY");

    if (endDate > startDate) {
      const url = 'http://localhost:3001/v1/vacations?user_id=' + personId + '&start_date=' + startDate + '&end_date=' + endDate;
      // TODO: add error if startDate == endDate, return error for failed response
      Request.post(url).set('accept', 'json').then(() => {})
      // TODO: update vacation list in DOM
    }
  };

  availableVacationDays(personId) {
    let days = null;

    this.state.persons.find(function(value){
      if (value.id === parseInt(personId)) {
        days = value.days
      }
    });

    return days;
  };

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    let persons = this.state.persons;
    let vacations = this.state.vacations;
    let datePicker = null;
    let daysLeft = null;

    if (this.state.currentPerson.id !== undefined) {
      datePicker = (
        <div className="vacation-picker">
          Start Date:
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
          />

          End Date:
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
          <Button bsStyle="primary" onClick={this.addVacation}>Add Vacation</Button>
        </div>
      );

      daysLeft = (
        <h4>{this.state.currentPerson.days} days left</h4>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="col-md-2">
          <div className="users">
            <h1>Users:</h1>
            <Persons persons={persons} clicked={this.setStateVacations}/>
          </div>
        </div>

        <div className="col-md-10 calendar">
          <h1>Calendar:</h1>
          {daysLeft}
          <div className="vacations col-md-6">
            <Vacations vacations={vacations}/>
          </div>
          <div className="col-md-6">
            {datePicker}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
