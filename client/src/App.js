import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Sidebar from './components/SideBar/Sidebar';
import Content from './components/Content/Content';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = () => {
  return (
    <>
      <Router>
        <Header />
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
      </Router>
    </>
  );
};

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
