import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spacer from '../Spacer/Spacer';
import UserCard from './components/UserCard/UserCard';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/components/MenuItem/MenuItem';
import { getUserState } from '../../redux/selectors';
import { logOutUser } from '../../redux/actions';

const Background = styled.div`
  background-color: rgb(36, 47, 60);
  height: 100vh;
  flex: 0 0 270px;
  min-width: 0;
  position: relative;
`;

const mapStateToProps = (state) => {
  const { user } = getUserState(state);

  return { user };
};

/* history */
const Sidebar = ({ user }) => {
  /* const handleLogout = () => {
    logOutUser();
    history.push("/");
  }; */
  return (
    <Background>
      {user && (
        <>
          <Spacer top={2} />
          <UserCard user={user} />
          <Spacer top={2} />
        </>
      )}
      <Menu>
        <MenuItem>
          <Link to="/"> Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login"> Login</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register"> Register</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about"> About</Link>
        </MenuItem>
      </Menu>
    </Background>
  );
};

export default withRouter(connect(mapStateToProps, { logOutUser })(Sidebar));
