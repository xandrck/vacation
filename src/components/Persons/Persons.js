import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
  return (
    <div>
      {
        props.persons.map((person, index) => {
          return <Person key={index} name={person.name} days={person.days}/>
        })
      }
  </div>
  )
};

export default persons;