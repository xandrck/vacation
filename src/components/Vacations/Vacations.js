import React from 'react';
import Vacation from './Vacation/Vacation';

const vacations = (props) => {
  let tableHeaders = null;

  if (props.vacations.length > 0) {
    tableHeaders = (
      <tr>
        <th className="col-md-5">Begins:</th>
        <th className="col-md-5">Ends:</th>
        <th className="col-md-2">Days:</th>
      </tr>
    )
  }

  return (
    <table>
      <thead>
        {tableHeaders}
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