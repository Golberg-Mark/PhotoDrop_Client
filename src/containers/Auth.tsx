import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Route, Routes, Navigate } from 'react-router';

import AuthFirstStep from '@/components/Auth/AuthFirstStep';
import AuthSecondStep from '@/components/Auth/AuthSecondStep';
import { selectAuthStep } from '@/store/selectors/userSelector';

interface Props {
  isItChanging?: boolean
}

const Auth: React.FC<Props> = ({ isItChanging }) => {
  const authStep = useSelector(selectAuthStep);

  const replacePath = isItChanging ? '/profile/settings/changePhone' : '/auth';

  return (
    <Container>
      <Routes>
        <Route path="/" element={<AuthFirstStep isItChanging={isItChanging} />} />
        <Route path="/verify" element={
          authStep === 2 ? <AuthSecondStep isItChanging={isItChanging} /> : <Navigate to={replacePath} replace />
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
