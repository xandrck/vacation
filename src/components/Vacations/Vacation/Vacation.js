import React from 'react';

const vacation = (props) => {
  return (
    <div>
      <p>Begin: {props.start_date}, End: {props.end_date}, Days count: {props.days}</p>
    </div>
  )
};

export default vacation;