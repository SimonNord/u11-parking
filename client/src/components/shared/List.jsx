import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  margin: 0 auto;
`;

const List = ({ list, handleDelete, handleMakeActive }) => {
  if (!list) {
    return <div>you have no cars</div>;
  }

  return (
    <Table>
      <thead>
        <th>Name</th>
        <th>Registration Number</th>
      </thead>
      <tbody>
        {list.map((item) => {
          return (
            <tr key={item.id}>
              {!item.active && (
                <button onClick={() => handleMakeActive(item._id)} type="button">
                  &#10004;
                </button>
              )}
              <td>{item.name}</td>
              <td>{item.registrationNumber}</td>
              <span onClick={() => handleDelete(item._id)}>X</span>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default List;
