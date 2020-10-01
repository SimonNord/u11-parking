import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul``;

const Menu = ({ children }) => {
  return (
    <nav role="navigation">
      <StyledList>{children}</StyledList>
    </nav>
  );
};

export default Menu;
