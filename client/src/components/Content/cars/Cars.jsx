import Axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Form from '../.././shared/Form';
-
const Cars = ({ user }) => {
    const handlesubmit = () => {
        Axios.put(`http:/localhost:4000/user/${user.id}`,)
    }
  const { cars } = user;
  return (
    <div>
      {cars.length ? <div>You have no registered cars</div> : <Cars />}
      <Form title="add car" handleSubmit={handleSubmit} >
        <label>
          {' '}
          Add a car
          <input type="text"></input>
        </label>
       

        </Form>
     </div>
    
  );
};

export default Cars;
