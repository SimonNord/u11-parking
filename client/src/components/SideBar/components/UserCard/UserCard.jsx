import React, { useState } from 'react';
import styled from 'styled-components';
import AnchorLink from '../../../shared/AnchorLink';
import ExpandedList from './ExpandedList/ExpandedList';
import { logOutUser } from '../../../../redux/actions';
import { getUserState } from '../../../../redux/selectors';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  const { user } = getUserState(state);

  return { user };
};
const UserCard = ({ user, logOutUser }) => {
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
          {user && (
            <AnchorLink to="/login">
              <span onClick={logOutUser}>Log Out</span>
            </AnchorLink>
          )}
        </ExpandedList>
      )}
    </div>
  );
};
export default connect(mapStateToProps, { logOutUser })(UserCard);
