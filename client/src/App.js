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
        <Container>
          <Sidebar />
          <Content />
        </Container>
      </Router>
    </>
  );
};

export default App;
