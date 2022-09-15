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
    <GlobalContainer>
      <GlobalStyle />
      <Header />
      <RoutesContainer>
        <Routes>
          <Route path="/" element={<ProtectedRouter><Albums /></ProtectedRouter>} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/selfie" element={<ProtectedRouter><Selfie /></ProtectedRouter>} />
        </Routes>
      </RoutesContainer>
      {errorMessage ? <ErrorModalWindow error={errorMessage} /> : ''}
    </GlobalContainer>
  );
};

const GlobalContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1440px;
  height: 100vh;
`;

const RoutesContainer = styled.div`
  padding: 0 15px;
  min-height: calc(100% - 60px);
`;

export default App;
