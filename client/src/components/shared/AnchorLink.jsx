import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px;
  font-size: 600;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

const AnchorLink = ({ children }) => {
  return <StyledLink>{children}</StyledLink>;
};

export default AnchorLink;
