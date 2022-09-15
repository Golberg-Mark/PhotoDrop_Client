import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Logo, { LogoMobile } from '@/icons/Logo';
import BackIcon from '@/icons/BackIcon';
import { userActions } from '@/store/actions/userActions';

enum PathNames {
  AUTH = '/auth/verify',
  AUTH2 = '/selfie'
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const backToAuthHandler = () => {
    localStorage.removeItem('token');
    dispatch(userActions.cleanAuthState());
    navigate('/auth', { replace: true });
  };

  const getBackArrow = () => {
    switch (pathname) {
      case PathNames.AUTH: case PathNames.AUTH2: {
        return <BackIcon onClick={backToAuthHandler} />;
      }
      default: return '';
    }
  };

  return (
    <StyledHeader>
      <Container>
        <Back>
          {getBackArrow()}
        </Back>
        <LogoIcon>
          {window && window.innerWidth < 640 ? <LogoMobile /> : <Logo />}
        </LogoIcon>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #F1F0EC;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 20px 15px 18px;
  max-width: 1440px;
  width: 100%;

  @media (min-width: 640px) {
    padding: 19px 40px;
  }
`;

const Back = styled.div`
  width: 8px;
`;

const LogoIcon = styled.div`
  margin: 0 auto;
`;

export default Header;
