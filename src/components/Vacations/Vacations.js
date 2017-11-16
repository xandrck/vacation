import React from 'react';
import Vacation from './Vacation/Vacation';

const vacations = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="col-md-5">Begins:</th>
          <th className="col-md-5">Ends:</th>
          <th className="col-md-2">Days:</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  )
};

export default vacations;