import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import ReactCodeInput from 'react-code-input';

import PageTitle from '@/components/PageTitle';
import { selectAuthNumber } from '@/store/selectors/userSelector';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import useToggle from '@/hooks/useToggle';
import { createAccountAction, userActions, verifyOtpAction } from '@/store/actions/userActions';
import Button from '@/components/Button';
import useInput from '@/hooks/useInput';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import Loader from '@/components/Loader';
import useKeyPress from '@/hooks/useKeyPress';

const AuthSecondStep = () => {
  const [code, setCode] = useInput('', 6);
  const [isCodeResend, toggleIsCodeResend] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const navigate = useNavigate();
  const isEnterPressed = useKeyPress('Enter');
  const isEscapePressed = useKeyPress('Escape');
  const { countryCode, phoneNumber } = useSelector(selectAuthNumber)!;
  const error = useSelector(selectErrorMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEnterPressed) sendOtp();
    if (isEscapePressed) {
      dispatch(userActions.setAuthStep(1));
      navigate(-1);
    }
  }, [isEnterPressed, isEscapePressed]);

  useEffect(() => {
    if (isCodeResend) {
      const timerFunc = setTimeout(() => {
        toggleIsCodeResend(false);
      }, 2000);

      return () => clearTimeout(timerFunc);
    }
  }, [isCodeResend]);

  useEffect(() => {
    toggleIsLoading(false);
  }, [error]);

  const resendCode = () => {
    toggleIsCodeResend(true);
    dispatch(createAccountAction({ countryCode, phoneNumber }, true));
  };

  const codeChangeHandler = (value: string) => {
    setCode(value);
  };

  const sendOtp = () => {
    toggleIsLoading(true);
    dispatch(verifyOtpAction({ countryCode, phoneNumber }, code));
  };

  const isCorrect = code.length === 6;

  return (
    <Container>
      <PageTitle>What’s the code?</PageTitle>
      <Code>
        <p>
          Enter the code sent to
          <span>
            {` ${formatPhoneNumber(countryCode + phoneNumber, countryCode)}`}
          </span>
        </p>
        <
          //@ts-ignore
          StyledReactCodeInput
          type="tel"
          fields={6}
          name={''}
          inputMode="tel"
          onChange={codeChangeHandler}
          {...InputStyles}
        />
      </Code>
      {isCodeResend ? (
        <CodeWasSent>
          The code was sent again!
        </CodeWasSent>
      ) : (
        <ResendCode onClick={resendCode}>
          Resend code
        </ResendCode>
      )}
      <Button disabled={!isCorrect} onClick={sendOtp}>
        {isLoading ? <Loader /> : 'Next'}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 106px;
`;

const Code = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;

  p {
    display: block;
    margin-bottom: 19px;
    
    span {
      font-weight: 700;
    }
  }
`;

const StyledReactCodeInput = styled(ReactCodeInput)`
  display: flex !important;
  grid-gap: 15px;
`;

const InputStyles = {
  inputStyle: {
    width: 'calc(100% / 6)',
    maxWidth: '45px',
    height: '40px',
    textAlign: 'center',
    border: '1px solid #EEE',
    borderRadius: '10px',
    backgroundColor: '#F4F4F4'
  }
};

const ResendCode = styled.p`
  margin-bottom: 20px;
  color: #3300CC;
  transition: .1s ease-in-out;
  cursor: pointer;

  :hover {
    color: rgba(51, 0, 204, 0.7);
  }
`;

const CodeWasSent = styled.p`
  margin-bottom: 20px;
  color: #0CBD2A;
`;

export default AuthSecondStep;
