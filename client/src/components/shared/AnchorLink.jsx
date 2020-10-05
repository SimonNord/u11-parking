import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
  background-color: ${(props) => props.bgColor} ||white;
  color: ${(props) => props.color};
  text-decoration: none;
  font-size: 600;
  &:hover {
    background-color: ${(props) => props.hoverBgColor};
    color: ${(props) => props.hoverColor};
  }
`;

const AnchorLink = ({ hoverColor, hoverBgColor, bgColor, color, to, children }) => {
  return (
    <StyledLink
      hoverBgColor={hoverBgColor}
      hoverColor={hoverColor}
      bgColor={bgColor}
      color={color}
      to={to}
    >
      {children}
    </StyledLink>
  );
};

export default AnchorLink;
