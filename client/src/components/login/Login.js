import React, { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import styled from "styled-components";

import Form from "../Form";

const Input = styled.input`
  padding: 10px;
  margin-bottom: 25px;
`;

const StyledButton = styled.button`
  width: 50%;
  padding: 6px;
`;

const Login = ({ history }) => {
  const [isError, setIsError] = useState();
  const [formData, setformData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/auth/login", formData)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setIsError(null);
          setIsLoading(false);
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
    return (
      <ReactLoading type={"spin"} color={"red"} height={667} width={375} />
    );
  }

  return (
    <Form title='Login' handleSubmit={handleSubmit}>
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
        id='password'
        name='password'
        type='password'
        placeholder='Password'
        minLength='7'
      />
      <StyledButton type='submit'>Register</StyledButton>
      {isError && <div className='error'>{isError.data.message}</div>}
    </Form>
  );
};

export default Login;
