import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: gray;
  padding: 10px;
`;
const StyledList = styled.ul`
  width: 500px;
  display: flex;
  justify-content: space-around;
  list-style: none;
`;

const Header = ({ user }) => {
  return (
    <header>
      <StyledNav>
        <StyledList>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </StyledList>
        {user && <div>{user.firstname}</div>}
      </StyledNav>
    </header>
  );
};

export default Header;
