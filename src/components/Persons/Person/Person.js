import React from 'react';

const person = (props) => {
  return (
    <div>
      <p id={props.id} onClick={props.clicked}>
        {props.name}
      </p>
    </div>
  )
};

export default person;