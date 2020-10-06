import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import Form from '../../shared/Form';
import Car from './components/Car';
import { getUserState } from '../../../redux/selectors';

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
  const [message, setMessage] = useState();
  const handleChange = async (event) => {
    const { target } = event;
    const { value } = target;

    setformData({ ...formData, [target.name]: value });
  };

  const addCar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:4000/api/cars',
        {
          name: formData.name,
          registrationNumber: formData.registrationNumber,
          owner: user.id,
        },
        {
          headers: {
            'x-auth-token': user.token,
          },
        }
      );

      setIsLoading(false);
      if (res.status === 201) {
        setMessage(`You created a car with name: ${res.data.car.name}`);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      {user.cars < 1 ? <div> You have no registered cars</div>}

      <Form title="Add a new car" handleSubmit={addCar}>
        {isLoading ? (
          <ReactLoading color="red" width="100px" />
        ) : (
          <>
            <Input onChange={handleChange} placeholder="Name" id="name" name="name" type="text" />
            <Input
              onChange={handleChange}
              placeholder="ABC123"
              id="registrationNumber"
              name="registrationNumber"
              type="text"
            />
            <button type="submit">Add</button>
          </>
        )}
      </Form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default connect(mapStateToProps, { getUserState })(Cars);
