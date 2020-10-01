import React, { useState } from 'react';
import styled from 'styled-components';
import AnchorLink from '../../../shared/AnchorLink';

import ExpandedList from './ExpandedList/ExpandedList';

const Background = styled.div`
  display: flex;
  background-color: rgb(57, 67, 78);
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  margin: 0 10px;
`;

const LeftContent = styled.div`
  display: flex;
  overflow: hidden;
`;

const Username = styled.p`
  color: white;
  margin: 0px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
`;

const Email = styled.div`
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 3px;
`;

const UserCard = ({ user }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Background onClick={() => setShow(!show)}>
        <LeftContent>
          <Image />
          <TextContainer>
            <Username>{user.firstname}</Username>
            <Email>{user.email}</Email>
          </TextContainer>
        </LeftContent>
      </Background>
      {show && (
        <ExpandedList>
          <AnchorLink to="/cars">Your Cars</AnchorLink>
          <AnchorLink to="/settings">Settings</AnchorLink>
        </ExpandedList>
      )}
    </div>
  );
};

export default UserCard;
