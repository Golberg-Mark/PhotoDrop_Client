import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { HandleToggle } from '@/hooks/useToggle';

interface Props extends HTMLAttributes<HTMLDivElement>{
  onClick: HandleToggle,
  zIndex?: number
}

const Background: React.FC<Props> = ({ onClick, zIndex = 1000, children }) => {
  return (
    <StyledBackground onClick={onClick} zIndex={zIndex}>
      {children}
    </StyledBackground>
  );
};

const StyledBackground = styled.div<{ zIndex: number }>`
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
  z-index: ${({ zIndex }) => zIndex};
`;

export default Background;
