import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import Form from '../../shared/Form';
import List from '../../shared/List';
import { getUserState } from '../../../redux/selectors';

const Input = styled.input`
  padding: 10px;
  margin-bottom: 25px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
`;

const mapStateToProps = (state) => {
  const { user } = getUserState(state);
  return { user };
};

const Cars = ({ user }) => {
  const [carList, setCarList] = useState();
  const [formData, setformData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [listAmount, setListAmount] = useState();
  const [activeCar, setActiveCar] = useState();

  const handleChange = async (event) => {
    const { target } = event;
    const { value } = target;

    setformData({ ...formData, [target.name]: value });
  };

  const handleSetActiveCar = () => {
    const tempActiveCar = carList.filter((car) => {
      return car.active === true;
    });
    setActiveCar(tempActiveCar);
  };

  const getUserCars = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/cars/${user._id}`, {
        headers: {
          'x-auth-token': user.token,
        },
      });

      setIsLoading(false);
      if (res.status === 200) {
        setCarList(res.data);
        setListAmount(res.data.length);
        handleSetActiveCar();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getUserCars();
  }, [listAmount, activeCar]);

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
        setListAmount((prevState) => {
          return prevState + 1;
        });
        setMessage(`You created a car with name: ${res.data.car.name}`);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteCar = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/cars/${id}`, {
        headers: { 'x-auth-token': user.token },
      });
      if (res.status === 200) {
        setListAmount((prevState) => {
          return prevState - 1;
        });
        setMessage('car removed successfully');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const makeActive = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/cars/${id}`,
        {
          active: true,
        },
        {
          headers: { 'x-auth-token': user.token },
        }
      );
      if (res.status === 200) {
        setMessage('Updated active car');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <h2>Your Cars</h2>
      <List list={carList} handleDelete={deleteCar} handleMakeActive={makeActive} />
      <Form title="Add a new car" handleSubmit={addCar}>
        {isLoading ? (
          <ReactLoading type="spin" color="red" width="100px" />
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
            <div>{message}</div>
          </>
        )}
      </Form>
    </Container>
  );
};

export default connect(mapStateToProps, { getUserState })(Cars);
