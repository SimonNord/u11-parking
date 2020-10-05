import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from '../../shared/Form';
import Car from './components/Car';
import { getUserState } from '../../../redux/selectors';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  margin-bottom: 25px;
`;
const mapStateToProps = (state) => {
  const { user } = getUserState(state);

  return { user };
};

const Cars = ({ user }) => {
  const [formData, setformData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = async (event) => {
    console.log(formData);
    const { target } = event;
    const { value } = target;

    setformData({ ...formData, [target.name]: value });
  };

  const addCar = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.put(
        'http://localhost:4000/user',
        { data: user.cars.push(formData) },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user.car < 1 ? (
        <div> You have no registered cars</div>
      ) : (
        user.cars.map((car) => {
          return <Car car={car} />;
        })
      )}

      <Form title="Add a new car" handleSubmit={addCar}>
        <Input onChange={handleChange} placeholder="Name" id="name" name="name" type="text" />
        <Input
          onChange={handleChange}
          placeholder="ABC123"
          id="registrationNumber"
          name="registrationNumber"
          type="text"
        />
        <button type="submit">Add</button>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, { getUserState })(Cars);
