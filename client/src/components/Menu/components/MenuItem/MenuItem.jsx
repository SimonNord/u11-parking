import React from 'react';
import styled from 'styled-components';

const MenuListItem = styled.li`
  list-style-type: none;
  margin-bottom: 8px;
`;

const MenuItem = ({ children }) => {
  return <MenuListItem>{children}</MenuListItem>;
};

export default MenuItem;
