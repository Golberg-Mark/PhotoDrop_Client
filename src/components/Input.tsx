import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => {
  return (
    <StyledInput {...props} />
  );
};

const StyledInput = styled.input`
  padding: 15px 13px;
  width: 100%;
  height: 40px;
  border: 1px solid #EEE;
  border-radius: 10px;
  background-color: #EEE;
  
  :focus {
    border: 1px solid #3300CC;
  }
`;

export default Input;
