import React from 'react';
import styled from 'styled-components';
import { Route, Routes, Navigate } from 'react-router';

import AuthFirstStep from '@/components/Auth/AuthFirstStep';
import AuthSecondStep from '@/components/Auth/AuthSecondStep';
import { useSelector } from 'react-redux';
import { selectAuthStep } from '@/store/selectors/userSelector';

const Auth = () => {
  const authStep = useSelector(selectAuthStep);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<AuthFirstStep />} />
        <Route path="/verify" element={
          authStep === 2 ? <AuthSecondStep /> : <Navigate to="/auth" replace />
        }/>
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 375px;
`;

export default Auth;
