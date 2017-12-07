import React from 'react';
import Aux from '../../hoc/Aux';
import Person from './Person/Person';

import './Persons.css'

const persons = ( props ) => (
  <Aux>
    <div className="persons">
      <h1>Users:</h1>
      {
        props.persons.map((person) => {
          return <Person key={person.id} name={person.name} clicked={props.clicked} id={person.id}/>
        })
      }
    </div>
  </Aux>
);

export default persons;
