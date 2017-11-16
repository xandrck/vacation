import React from 'react';

const vacation = (props) => {
  return (
    <tr>
      <td>{props.start_date}</td>
      <td>{props.end_date}</td>
      <td>{props.days}</td>
    </tr>
  )
};

export default vacation;