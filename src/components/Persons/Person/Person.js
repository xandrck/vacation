import React from 'react';

const person = (props) => {
  return (
    <div>
      <p>{props.name} - {props.days} days left</p>
    </div>
  )
};

export default person;