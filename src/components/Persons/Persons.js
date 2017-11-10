import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
  return (
    <div>
      {
        props.persons.map((person) => {
          return <Person key={person.id} name={person.name} days={person.days}/>
        })
      }
  </div>
  )
};

export default persons;