import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './login/Login';
import Register from './register/Register';

const FullHeightAndWidth = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = () => {
  return (
    <FullHeightAndWidth>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </FullHeightAndWidth>
  );
};

const About = () => {
  return <h1>About</h1>;
};
const Home = () => {
  return <h1>Home</h1>;
};

export default Content;
