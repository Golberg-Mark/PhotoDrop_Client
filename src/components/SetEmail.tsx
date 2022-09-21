import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import useKeyPress from '@/hooks/useKeyPress';
import useInput from '@/hooks/useInput';
import useToggle from '@/hooks/useToggle';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import { updateClientAction } from '@/store/actions/userActions';
import PageTitle from '@/components/PageTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

interface Props {
  isChanging?: boolean,
  userEmail?: string,
  userName?: string
}

const SetEmail: React.FC<Props> = ({ isChanging, userEmail = '', userName }) => {
  const [email, setEmail] = useInput(userEmail, 100);
  const [isLoading, toggleIsLoading] = useToggle();
  const isEnterPressed = useKeyPress('Enter');
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleIsLoading(false);
  }, [error]);

  useEffect(() => {
    if (isEnterPressed) saveEmail();
  }, [isEnterPressed]);

  const saveEmail = () => {
    if (isValid) {
      toggleIsLoading(true);
      dispatch(updateClientAction({ email }, '/profile'));
    }
  };

  const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const isValid = emailRegExp.test(email);

  return (
    <StyledSetEmail>
      <PageTitle marginBottom={0}>
        { isChanging ? 'Your email' : `Hey there, ${userName}! 👋` }
      </PageTitle>
      <Input type="text" value={email} onChange={setEmail} placeholder="What’s your email?" />
      <Button width={420} disabled={!isValid} onClick={saveEmail}>
        {isLoading ? <Loader /> : 'Save'}
      </Button>
    </StyledSetEmail>
  );
};

const StyledSetEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
  margin: 0 auto;
  padding-top: 160px;
  max-width: 420px;
  width: 100%;
`;

export default SetEmail;
