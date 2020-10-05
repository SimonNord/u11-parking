import React from 'react';
import styled from 'styled-components/';

const StyledExpandedList = styled.div.attrs({
  role: 'menu',
})`
  position: absolute;
  left: 0;
  right: 0;
  margin: 3px 10px;
  padding: 4px 0;
  border-radius: 3px;
  background-color: white;
  text-align: left;
  z-index: 999;
`;

const StyledExpandedListUp = styled(StyledExpandedList)`
  bottom: 43px;
`;

export const ExpandedListItem = styled.span.attrs({
  role: 'menuitem',
})`
  display: block;
  font-size: 15px;
  font-weight: 500;
`;

const ExpandedList = ({ children, direction }) => {
  if (direction) {
    return <StyledExpandedListUp>{children}</StyledExpandedListUp>;
  }
  return <StyledExpandedList>{children}</StyledExpandedList>;
};

export default ExpandedList;
