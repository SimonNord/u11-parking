import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUserState } from "../../redux/selectors";
import { logOutUser } from "../../redux/actions";

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

const mapStateToProps = (state) => {
  const { user } = getUserState(state);

  return { user };
};

const Header = ({ user, logOutUser }) => {
  const handleLogout = () => {
    logOutUser();
  };
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
        {user && (
          <div>
            Logged in as user: <strong>{user.firstname}</strong>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </StyledNav>
    </header>
  );
};
export default connect(mapStateToProps, { logOutUser })(Header);
