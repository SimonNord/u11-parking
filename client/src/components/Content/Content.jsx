import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserState } from '../../redux/selectors';
import Login from './login/Login';
import Register from './register/Register';
import Cars from './cars/Cars';

const FullHeightAndWidth = styled.div`
  width: 100%;
  height: 100%;
`;

const mapStateToProps = (state) => {
  const { user } = getUserState(state);

  return { user };
};
const Content = ({ user }) => {
  return (
    <FullHeightAndWidth>
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        {user ? (
          <Route exact path="/cars">
            <Cars />
          </Route>
        ) : (
          <Redirect to="/login" />
        )}
        ;
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

export default connect(mapStateToProps, {})(Content);
