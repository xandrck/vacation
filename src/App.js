import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Layout from './components/Layout/Layout';
import Persons from './components/Persons/Persons';
import Vacations from './components/Vacations/Vacations';
import request from 'superagent'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './assets/css/App.css';

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
    this.getPersons = this.getPersons.bind(this);
    this.setStateVacations = this.setStateVacations.bind(this);
    this.setCurrentPerson = this.setCurrentPerson.bind(this);
    this.getVacations = this.getVacations.bind(this);
    this.addVacation = this.addVacation.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.availableVacationDays = this.availableVacationDays.bind(this);
    this.updatePersonDays = this.updatePersonDays.bind(this);
  };

  componentDidMount() {
    this.getPersons();
  }

  setStatePersons(persons) {
    this.setState({
      persons: persons
    })
  };

  setStateVacations(vacations) {
    this.setState({
      vacations: vacations
    })
  };

  setCurrentPerson(personId) {
    this.setState({
      currentPerson: { id: personId, days: this.availableVacationDays(personId) }
    })
  }

  getPersons() {
    const url = 'http://localhost:3001/v1/users';
    request
      .get(url)
      .then((response) => {
        this.setStatePersons(response.body);
      })
  };

  getVacations(element) {
    let personId = element.target.id;
    const url = 'http://localhost:3001/v1/users/' + personId;
    request
      .get(url)
      .then((response) => {
        this.setStateVacations(response.body);
        this.setCurrentPerson(personId);
      });
  }

  addVacation() {
    let personId = this.state.currentPerson.id;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (endDate.format("MM-DD-YYYY") > startDate.format("MM-DD-YYYY")) {
      const url = 'http://localhost:3001/v1/vacations';
      request
        .post(url)
        .query({ user_id: personId, start_date: startDate.format("DD-MM-YYYY"), end_date: endDate.format("DD-MM-YYYY") })
        .then((response) => {
          let vacations = this.state.vacations.concat(response.body);
          this.setStateVacations(vacations);
          this.updatePersonDays(personId, response.body['days'])
        });
    } else {
      console.log('wrong date')
    }
  };

  updatePersonDays(personId, vacationDays) {
    let days = null;
    let currentPerson = this.state.currentPerson;
    let person = null;
    let persons = this.state.persons;

    persons.forEach(function(value, index){
      if (value.id === parseInt(personId, 10)) {
        days = value.days - vacationDays;
        currentPerson = Object.assign({}, currentPerson, {days: days});
        person = Object.assign({}, persons[1], {days: days});
        persons[index] = person;
      }
    });

    this.setState({
      currentPerson: currentPerson,
      persons: persons
    })
  }

  availableVacationDays(personId) {
    let days = null;

    this.state.persons.forEach(function(value){
      if (value.id === parseInt(personId, 10)) {
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
          <h4>Add new vacation:</h4>
          <div>
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
        </div>
      )
    }

    if (this.state.currentPerson.days !== undefined) {
      daysLeft = (
        <h4>{this.state.currentPerson.days} days left</h4>
      )
    }

    return (
      <Layout>
        <div className="col-md-2">
          <Persons persons={persons} clicked={this.getVacations}/>
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
      </Layout>
    );
  }
}

export default App;
