import React from 'react';
import styled from 'styled-components';

const Spacer = ({ children, top, right, bottom, left }) => {
  const paddingTop = top * 8;
  const paddingRight = right * 8;
  const paddingBottom = bottom * 8;
  const paddingLeft = left * 8;

  const SpacerDiv = styled.div`
    padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px;
  `;

  return <SpacerDiv>{children}</SpacerDiv>;
};

export default Spacer;
