import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Logo, { LogoMobile } from '@/assets/icons/Logo';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      {/*pathname === '/' ? 'mainPage' : ''*/}
      {window && window.innerWidth < 640 ? <LogoMobile /> : <Logo />}
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px 18px;
  height: 60px;
  border-bottom: 1px solid #F1F0EC;
  
  div {
    margin: 0 auto;
  }
  
  @media (min-width: 640px) {
    padding: 19px 40px;
  }
`;

export default Header;
