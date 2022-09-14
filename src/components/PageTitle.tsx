import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLHeadingElement>{
  fontSize?: number,
  marginBottom?: number
}

const PageTitle: React.FC<Props> = ({ fontSize = 22, marginBottom = 14, children }) => {
  return (
    <StyledPageTitle fontSize={fontSize} marginBottom={marginBottom}>
      {children}
    </StyledPageTitle>
  );
};

const StyledPageTitle = styled.h2<{ fontSize: number, marginBottom: number }>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 700;
  text-align: center;
`;

export default PageTitle;
