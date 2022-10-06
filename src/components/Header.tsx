import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Logo, { LogoMobile } from '@/icons/Logo';
import BackIcon from '@/icons/BackIcon';
import { userActions } from '@/store/actions/userActions';
import { selectTempUserPhoto, selectUser } from '@/store/selectors/userSelector';

enum PathNames {
  AUTH = '/auth/verify',
  AUTH2 = '/selfie',
  MAIN_PAGE = '/',
  THANKS_PAGE = '/purchase/thanks'
}

const Header = () => {
  const tempPhoto = useSelector(selectTempUserPhoto);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const backToAuthHandler = () => {
    localStorage.removeItem('token');
    dispatch(userActions.cleanAuthState());
    navigate('/auth', { replace: true });
  };

  const getBackArrow = () => {

    if (new RegExp(/\/profile.*/).test(pathname)) {
      return <BackIcon onClick={() => navigate(-1)} />
    }

    switch (pathname) {
      case PathNames.AUTH: case PathNames.AUTH2: {
        return <BackIcon onClick={backToAuthHandler} />;
      }
      default: return '';
    }
  };

  const selfie =  tempPhoto || user?.selfie;
  let isWithSelfie;

  switch (pathname) {
    case PathNames.MAIN_PAGE: case PathNames.THANKS_PAGE: {
      if (selfie) isWithSelfie = true;
      break;
    }
    default: isWithSelfie = false;
  }

  const isHeaderVisible = !(new RegExp(/\/albums\/(?!thanks$)+.*/).test(pathname));

  return (
    <StyledHeader style={{ display: isHeaderVisible ? 'block' : 'none'}} >
      <Container>
        <Back>
          {getBackArrow()}
        </Back>
        <LogoIcon to="/">
          {window && window.innerWidth < 640 ? <LogoMobile /> : <Logo />}
        </LogoIcon>
        <Profile to="/profile">
          {isWithSelfie ? <ProfilePhoto src={selfie} alt="Your selfie"/> : ''}
        </Profile>
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  margin: 0 auto;
  padding: 10px 15px 10px;
  max-width: 1440px;
  width: 100%;
  height: 60px;

  @media (min-width: 640px) {
    padding: 10px 40px;
  }
`;

const Back = styled.div`
  width: 8px;
`;

const LogoIcon = styled(Link)`
  display: block;
  margin: 0 auto;
  height: 22px;
`;

const Profile = styled(Link)`
  display: block;
  margin: 0 0 0 auto;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  align-self: center;
  user-select: none;
`;

const ProfilePhoto = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
`;

export default Header;
