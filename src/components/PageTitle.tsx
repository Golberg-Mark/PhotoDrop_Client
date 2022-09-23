import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

type TextAlign = 'left' | 'center' | 'right';

interface Props extends HTMLAttributes<HTMLHeadingElement>{
  fontSize?: number,
  textAlign?: TextAlign,
  marginBottom?: number
}

const PageTitle: React.FC<Props> = ({
  fontSize = 22,
  textAlign = 'center',
  marginBottom = 14,
  children
}) => {
  return (
    <StyledPageTitle fontSize={fontSize} marginBottom={marginBottom} textAlign={textAlign}>
      {children}
    </StyledPageTitle>
  );
};

const StyledPageTitle = styled.h2<{ fontSize: number, marginBottom: number, textAlign: TextAlign }>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 700;
  text-align: ${({ textAlign }) => textAlign};
`;

export default PageTitle;
