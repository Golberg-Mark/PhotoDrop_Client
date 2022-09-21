import React, { useEffect, useState } from 'react';
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
  PROFILE = '/profile',
  MAIN_PAGE = '/'
}

const Header = () => {
  const [pathNames, setPathNames] = useState(new Set<string>([]));
  const tempPhoto = useSelector(selectTempUserPhoto);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathNames.size === 2) {
      setPathNames(prevState => {
        const values = [...prevState];
        return new Set([values[1], pathname]);
      });
    } else setPathNames((prevState => prevState.add(pathname)));
  }, [pathname]);

  useEffect(() => {
    /*TODO: remove this useEffect after testing*/
    console.log(pathNames);
  }, [pathNames]);

  const backToAuthHandler = () => {
    localStorage.removeItem('token');
    dispatch(userActions.cleanAuthState());
    navigate('/auth', { replace: true });
  };

  const getBackArrow = () => {
    let previousPage: string | string[] = [...pathNames];
    previousPage = previousPage.length === 2 ? previousPage[0] : '/';

    switch (pathname) {
      case PathNames.AUTH: case PathNames.AUTH2: {
        return <BackIcon onClick={backToAuthHandler} />;
      }
      case PathNames.PROFILE : {
        return <BackIcon onClick={() => navigate(previousPage as string)} />
      }
      default: return '';
    }
  };

  const selfie =  tempPhoto || user?.selfie;
  const isWithSelfie = pathname === PathNames.MAIN_PAGE && selfie;

  return (
    <StyledHeader>
      <Container>
        <Back>
          {getBackArrow()}
        </Back>
        <LogoIcon>
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

const Profile = styled(Link)`
  display: block;
  margin: 0 0 0 auto;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
`;

const ProfilePhoto = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
`;

export default Header;
