import React from 'react';
import styled from 'styled-components';

const FormBackground = styled.div`
  text-align: center;
  width: 500px;
  margin: 150px auto;
  padding: 1px;
`;

const StyledForm = styled.form`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;
`;

const Form = ({ title, handleSubmit, children }) => {
  return (
    <FormBackground>
      <h1>{title}</h1>
      <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
    </FormBackground>
  );
};

export default Form;
