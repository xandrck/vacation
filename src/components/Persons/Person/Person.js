import React from 'react';

const person = (props) => {
  return (
    <div>
      <p id={props.id} onClick={props.clicked}>
        {props.name} - {props.days} days left
      </p>
    </div>
  )
};

export default person;