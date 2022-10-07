import React from 'react';
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes, Navigate } from 'react-router-dom';
import { normalize } from 'styled-normalize';

import Header from '@/components/Header';
import FuturaPtRegular from '@/fonts/futura-pt-book.ttf';
import FuturaPtBold from '@/fonts/futura-pt-bold.ttf';
import FuturaPtMedium from '@/fonts/futura-pt-medium.ttf';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import ErrorModalWindow from '@/containers/ErrorModalWindow';
import ProtectedRouter from '@/containers/ProtectedRouter';
import Albums from '@/containers/Albums';
import Auth from '@/containers/Auth';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { selectIsLoggedIn, selectUser } from '@/store/selectors/userSelector';

const Selfie = React.lazy(() => import('@/containers/Selfie'));
const Profile = React.lazy(() => import('@/containers/Profile'));
const PrivacyPage = React.lazy(() => import('@/components/PrivacyPage'));
const TermsPage = React.lazy(() => import('@/components/TermsPage'));

const GlobalStyle = createGlobalStyle`
  ${normalize};

  @font-face {
    font-family: 'FuturaPT';
    src: url(${FuturaPtRegular}) format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'FuturaPT';
    src: url(${FuturaPtBold}) format('truetype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'FuturaPT';
    src: url(${FuturaPtMedium}) format('truetype');
    font-weight: 500;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'FuturaPT', 'Arial', sans-serif;
    color: #262626;
    
    ::after, ::before {
      box-sizing: border-box;
    }
    
    :focus {
      outline: none;
    }
  }
  
  body {
    margin: 0;
    max-height: 100vh;
    height: 100%;
    font-size: 16px;
  }
  
  img {
    width: 100%;
    height: auto;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  svg, input, label, a {
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  p, span, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const App: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const errorMessage = useSelector(selectErrorMessage);

  return (
    <>
      <Header />
      <GlobalContainer>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<ProtectedRouter><Albums /></ProtectedRouter>} />
          <Route path="/auth/*" element={!user && !isLoggedIn ? <Auth /> : <Navigate to="/" />} />
          <Route path="/selfie" element={(
            <React.Suspense fallback={<Loader />}>
              <ProtectedRouter>
                <Selfie />
              </ProtectedRouter>
            </React.Suspense>
          )} />
          <Route path="/profile/*" element={(
            <React.Suspense fallback={<Loader />}>
              <ProtectedRouter>
                <Profile />
              </ProtectedRouter>
            </React.Suspense>
          )} />
          <Route path="/profile/*" element={(
            <React.Suspense fallback={<Loader />}>
              <Profile />
            </React.Suspense>
          )} />
          <Route path="/privacy" element={(
            <React.Suspense fallback={<Loader />}>
              <PrivacyPage />
            </React.Suspense>
          )} />
          <Route path="/terms" element={(
            <React.Suspense fallback={<Loader />}>
              <TermsPage />
            </React.Suspense>
          )} />
        </Routes>
        {errorMessage ? <ErrorModalWindow error={errorMessage} /> : ''}
      </GlobalContainer>
      <Footer />
    </>
  );
};

const GlobalContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1440px;
  min-height: calc(100vh - 60px);
  
  @media (min-width: 768px) {
    padding: 0 120px;
  }
`;

export default App;
