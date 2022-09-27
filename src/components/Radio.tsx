import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  name: string,
  checked?: boolean,
  disabled?: boolean,
  onClick?: React.MouseEventHandler<HTMLParagraphElement>
}

const Radio: React.FC<Props> = ({
  name,
  checked = false,
  disabled = false,
  onClick
}) => {
  return (
    <StyledRadio checked={checked} onClick={onClick} disabled={disabled}>
      {name}
    </StyledRadio>
  );
};

const StyledRadio = styled.p<{ checked: boolean, disabled: boolean }>`
  position: relative;
  padding-left: 32px;
  font-weight: 500;
  cursor: pointer;
  
  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ checked }) => checked ? '#3300CC' : '#6D6D6D'};
    border-radius: 50%;
    transform: translateY(-50%);
  }
  
  ${({ checked }) => checked ? css`
    color: #3300CC;
    
    ::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 4px;
      display: block;
      width: 12px;
      height: 12px;
      background-color: #3300CC;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  ` : ''}

  ${({ disabled }) => disabled ? css`
    color: #BBB;
    cursor: default;
    
    ::before {
      border-color: #BBB;
    }
  ` : ''}
`;

export default Radio;
