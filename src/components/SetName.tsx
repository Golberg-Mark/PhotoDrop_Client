import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '@/components/PageTitle';
import useInput from '@/hooks/useInput';
import Button from '@/components/Button';
import { updateClientAction } from '@/store/actions/userActions';
import Input from '@/components/Input';
import useToggle from '@/hooks/useToggle';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import useKeyPress from '@/hooks/useKeyPress';
import Loader from '@/components/Loader';

interface Props {
  isChanging?: boolean,
  userName?: string
}

const SetName: React.FC<Props> = ({ isChanging = false, userName = '' }) => {
  const [fullName, setFullName] = useInput(userName, 100, 'name');
  const [isLoading, toggleIsLoading] = useToggle();
  const isEnterPressed = useKeyPress('Enter');
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleIsLoading(false);
  }, [error]);

  useEffect(() => {
    if (isEnterPressed) saveName();
  }, [isEnterPressed]);

  const saveName = () => {
    if (isValid) {
      toggleIsLoading(true);
      dispatch(updateClientAction({ fullName }));
    }
  };

  const splitName = fullName.split(' ');
  const isValid = !!fullName.length && splitName.length === 2 && splitName[1] !== '';

  return (
    <StyledSetName>
      <PageTitle marginBottom={0}>
        { isChanging ? 'Your full name' : `Let's get to know you` }
      </PageTitle>
      <Input type="text" value={fullName} onChange={setFullName} placeholder="Jane Smith" />
      <Button width={420} disabled={!isValid} onClick={saveName}>
        {isLoading ? <Loader /> : 'Save'}
      </Button>
    </StyledSetName>
  );
};

const StyledSetName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
  margin: 0 auto;
  padding-top: 160px;
  max-width: 420px;
  width: 100%;
`;

export default SetName;
