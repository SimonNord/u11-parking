import React from 'react';
import styled from 'styled-components';

const List = ({ list }) => {
  if (!list) {
    return <div>you have no cars</div>;
  }
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Registration Number</th>
      </thead>
      <tbody>
        {list.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.registrationNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
