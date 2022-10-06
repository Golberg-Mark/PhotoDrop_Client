import React from 'react';
import { useParams } from 'react-router';

import PageTitle from '@/components/PageTitle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FailedCheckoutPage = () => {
  const { albumName } = useParams();

  return (
    <StyledPage>
      <PageTitle marginBottom={20}>
        Failed payment
      </PageTitle>
      <Info>
        The album
        <span>{` ${albumName} `}</span>
        isn't unlocked.
      </Info>
      <StyledLink to="/" replace>
        See photos
      </StyledLink>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  max-width: 375px;
`;

const Info = styled.p`
  margin-bottom: 20px;
  
  span {
    font-weight: 700;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 17px;
  width: 100%;
  height: 50px;
  font-size: 18px;
  text-align: center;
  color: #FFF;
  font-weight: 500;
  text-decoration: none;
  background-color: #3300CC;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: .2s;
`;

export default FailedCheckoutPage;
