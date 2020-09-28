import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import Form from "./Form";

const Input = styled.input`
  padding: 10px;
  margin-bottom: 25px;
`;
const HalfWidthInput = styled(Input)`
  width: 40%;
`;

const StyledButton = styled.button`
  width: 50%;
  padding: 6px;
`;

const Register = ({ history }) => {
  const [isError, setIsError] = useState();
  const [formData, setformData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/auth/register", formData)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setIsError(null);
          setIsLoading(false);
          history.push("/login");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setIsError(error.response);
      });
  };

  const handleChange = async (event) => {
    let target = event.target;
    let value = target.value;

    setformData({ ...formData, [target.name]: value });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <HalfWidthInput
          onChange={handleChange}
          id='firstname'
          name='firstname'
          type='text'
          placeholder='First Name'
          required
        />
        <HalfWidthInput
          onChange={handleChange}
          id='lastname'
          name='lastname'
          type='text'
          placeholder='Last Name'
          required
        />
      </div>

      <Input
        onChange={handleChange}
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        required
      />
      <Input
        onChange={handleChange}
        id='phoneNumber'
        name='phoneNumber'
        type='number'
        maxLength='10'
        minLength='8'
        placeholder='Phone Number'
        required
      />
      <Input
        onChange={handleChange}
        id='password'
        name='password'
        type='password'
        placeholder='Password'
        minLength='7'
      />
      <Input
        onChange={handleChange}
        id='passwordConfirm'
        name='passwordConfirm'
        type='password'
        placeholder='Confirm Password'
        minLength='7'
      />
      <StyledButton type='submit'>Register</StyledButton>
      {isError && <div className='error'>{isError.data.message}</div>}
    </Form>
  );
};

export default withRouter(Register);
