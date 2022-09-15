import React from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';

const Selfie = () => {
  return (
    <StyledSelfie>
      <PageTitle>Add a selfie</PageTitle>
      <Description>A selfie allows your photos to be synced with your account.</Description>
    </StyledSelfie>
  );
};

const StyledSelfie = styled.div`
  padding: 72px 0 0;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  text-align: center;
`;

export default Selfie;
