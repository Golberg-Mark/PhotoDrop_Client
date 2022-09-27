import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import PageTitle from '@/components/PageTitle';
import { Link } from 'react-router-dom';

const ThanksPage = () => {
  const { albumName } = useLocation().state as { albumName: string };

  return (
    <StyledThanksPage>
      <PageTitle marginBottom={20}>
        Thank you!
      </PageTitle>
      <UnlockedAlbum>
        The album
        <span>{` ${albumName} `}</span>
        is now unlocked.
      </UnlockedAlbum>
      <Possibilities>
        You can now download, share, post, and print your hi-res, watermark-free, glorious memories.
      </Possibilities>
      <img src={'/assets/Thanks.png'} alt="Thank you image"/>
      <StyledLink to="/" replace>
        See photos
      </StyledLink>
    </StyledThanksPage>
  );
};

const StyledThanksPage = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  max-width: 375px;
  
  img {
    display: block;
    margin-bottom: 30px;
    height: 200px;
    border-radius: 20px;
  }
`;

const UnlockedAlbum = styled.p`
  margin-bottom: 20px;
  
  span {
    font-weight: 700;
  }
`;

const Possibilities = styled.p`
  margin-bottom: 30px;
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

export default ThanksPage;
