import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { HandleToggle } from '@/hooks/useToggle';

interface Props extends HTMLAttributes<HTMLDivElement>{
  onClick: HandleToggle
}

const Background: React.FC<Props> = ({ onClick, children }) => {
  return (
    <StyledBackground onClick={onClick}>
      {children}
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .4);
  cursor: pointer;
  z-index: 1000;
`;

export default Background;
