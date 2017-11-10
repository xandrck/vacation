import React from 'react';
import Vacation from './Vacation/Vacation';

const vacations = (props) => {
  return (
    <div>
      {
        props.vacations.map((vacation, index) => {
          return <Vacation
            key={index}
            start_date={vacation.start_date}
            end_date={vacation.end_date}
            days={vacation.days}
          />
        })
      }
    </div>
  )
};

export default vacations;