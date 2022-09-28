import React from 'react';
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
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
import Selfie from '@/containers/Selfie';
import Profile from '@/containers/Profile';
import Footer from '@/components/Footer';
import PrivacyPage from '@/components/PrivacyPage';
import TermsPage from '@/components/TermsPage';

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
  const errorMessage = useSelector(selectErrorMessage);

  return (
    <>
      <Header />
      <GlobalContainer>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<ProtectedRouter><Albums /></ProtectedRouter>} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/selfie" element={<ProtectedRouter><Selfie /></ProtectedRouter>} />
          <Route path="/profile/*" element={<ProtectedRouter><Profile /></ProtectedRouter>} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
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
