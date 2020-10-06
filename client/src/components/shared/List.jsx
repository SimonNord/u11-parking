import React from 'react';
import styled from 'styled-components';

const List = ({ list, handleDelete, handleMakeActive }) => {
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
              {!item.active && (
                <button onClick={handleMakeActive} type="button">
                  &#10004;
                </button>
              )}
              <td>{item.name}</td>
              <td>{item.registrationNumber}</td>
              <button onClick={() => handleDelete(item._id)} type="button">
                X
              </button>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
