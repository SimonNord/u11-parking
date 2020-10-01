<<<<<<< Updated upstream:client/src/components/login/Login.js
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import styled from "styled-components";
import { setUser } from "../../redux/actions";
import { connect } from "react-redux";

import Form from "../shared/Form";
=======
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setUser } from '../../../redux/actions';

import Form from '../../shared/Form';
>>>>>>> Stashed changes:client/src/components/Content/login/Login.js

const Input = styled.input`
  padding: 10px;
  margin-bottom: 25px;
`;

const StyledButton = styled.button`
  width: 50%;
  padding: 6px;
`;

const Login = ({ history, setUser }) => {
  const [isError, setIsError] = useState();
  const [formData, setformData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);
      setIsLoading(false);

      if (response.status >= 200 && response.status < 300) {
        setUser(response.data.user);
        history.push('/');
      }
    } catch (err) {
      setIsError(err);
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { target } = event;
    const { value } = target;

    setformData({ ...formData, [target.name]: value });
  };

  if (isLoading) {
    return <ReactLoading type="spin" color="red" height={667} width={375} />;
  }

  return (
    <Form title="Login" handleSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <Input
        onChange={handleChange}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        minLength="7"
      />
      <StyledButton type="submit">Register</StyledButton>
      {isError && <div className="error">{isError.data.message}</div>}
    </Form>
  );
};

export default withRouter(connect(null, { setUser })(Login));
