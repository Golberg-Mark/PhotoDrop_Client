import React, { useEffect } from 'react';
import styled from 'styled-components';
import PhoneInput from '@/components/PhoneInput';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthNumber } from '@/store/selectors/userSelector';
import { createAccountAction } from '@/store/actions/userActions';
import PageTitle from '@/components/PageTitle';
import useToggle from '@/hooks/useToggle';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import Loader from '@/components/Loader';

const AuthFirstStep = () => {
  const [isLoading, toggleIsLoading] = useToggle();
  const dispatch = useDispatch();
  const authNumber = useSelector(selectAuthNumber);
  const error = useSelector(selectErrorMessage);

  useEffect(() => {
    if (error) toggleIsLoading(false);
  }, [error]);

  const createAccountHandler = () => {
    if (authNumber) {
      toggleIsLoading(true);
      dispatch(createAccountAction(authNumber));
    }
  };

  return (
    <Container>
      <PageTitle>Let’s get started</PageTitle>
      <Phone>
        <span>Enter your phone number</span>
        <PhoneInput />
      </Phone>
      <Button
        style={{ marginBottom: '20px' }}
        disabled={!authNumber}
        onClick={createAccountHandler}
      >
        {isLoading ? <Loader /> : 'Create account'}
      </Button>
      <AdditionalInfo style={{ marginBottom: '38px' }}>
        By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates
        to the number provided. Text “STOP” to 89203 to opt out.
      </AdditionalInfo>
      <AdditionalInfo>
        By continuing, you indicate that you have read and agree to our Terms of Use & Privacy Policy
      </AdditionalInfo>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 136px;
`;

const Phone = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;

   > span {
    display: block;
    margin-bottom: 19px;
  }
`;

const AdditionalInfo = styled.p`
  color: #6D6D6D;
`;

export default AuthFirstStep;
