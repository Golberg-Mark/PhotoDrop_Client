import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import PhoneInput from '@/components/PhoneInput';
import Button from '@/components/Button';
import { selectAuthNumber, selectUser } from '@/store/selectors/userSelector';
import { createAccountAction, userActions } from '@/store/actions/userActions';
import PageTitle from '@/components/PageTitle';
import useToggle from '@/hooks/useToggle';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import Loader from '@/components/Loader';
import useKeyPress from '@/hooks/useKeyPress';
import { PhoneRequest } from '@/api/mainApi';
import { Link } from 'react-router-dom';

interface Props {
  isItChanging?: boolean
}

const AuthFirstStep: React.FC<Props> = ({ isItChanging }) => {
  const [isLoading, toggleIsLoading] = useToggle();
  const isEnterPressed = useKeyPress('Enter');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authNumber = useSelector(selectAuthNumber);
  const error = useSelector(selectErrorMessage);

  useEffect(() => {
    if (error) toggleIsLoading(false);
  }, [error]);

  useEffect(() => {
    if (isEnterPressed) createAccountHandler();
  }, [isEnterPressed]);

  const createAccountHandler = () => {
    if (authNumber) {
      const body: PhoneRequest = {
        number: isItChanging ? user!.number : authNumber,
        newNumber: isItChanging ? authNumber : undefined
      };

      toggleIsLoading(true);
      dispatch(createAccountAction(body));
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
        {isLoading ? <Loader /> : isItChanging ? 'Next' : 'Create account'}
      </Button>
      <AdditionalInfo style={{ marginBottom: '38px' }}>
        By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates
        to the number provided. Text “STOP” to 89203 to opt out.
      </AdditionalInfo>
      <AdditionalInfo>
        {`By continuing, you indicate that you have read and agree to our `}
        <StyledLink to="/terms">Terms of Use</StyledLink>
        {` & `}
        <StyledLink to='/privacy'>Privacy Policy</StyledLink>
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

const StyledLink = styled(Link)`
  :hover {
    color: #3300CC;
    text-underline-color: #3300CC;
  }
`;

export default AuthFirstStep;
