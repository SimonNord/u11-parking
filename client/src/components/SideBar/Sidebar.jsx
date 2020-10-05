import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spacer from '../Spacer/Spacer';
import UserCard from './components/UserCard/UserCard';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/components/MenuItem/MenuItem';
import AnchorLink from '../shared/AnchorLink';
import { getUserState } from '../../redux/selectors';

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
          <AnchorLink
            color="white"
            bgColor="transparent"
            hoverColor="black"
            hoverBgColor="white"
            to="/"
          >
            Home
          </AnchorLink>
        </MenuItem>
        {!user && (
          <>
            <MenuItem>
              <AnchorLink
                color="white"
                bgColor="transparent"
                hoverColor="black"
                hoverBgColor="white"
                to="/login"
              >
                Login
              </AnchorLink>
            </MenuItem>
            <MenuItem>
              <AnchorLink
                color="white"
                bgColor="transparent"
                hoverColor="black"
                hoverBgColor="white"
                to="/register"
              >
                Register
              </AnchorLink>
            </MenuItem>
          </>
        )}

        <MenuItem>
          <AnchorLink
            color="white"
            bgColor="transparent"
            hoverColor="black"
            hoverBgColor="white"
            to="/about"
          >
            About
          </AnchorLink>
        </MenuItem>
      </Menu>
    </Background>
  );
};

export default connect(mapStateToProps, {})(Sidebar);
