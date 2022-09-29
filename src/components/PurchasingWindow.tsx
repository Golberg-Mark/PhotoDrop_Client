import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Background from '@/components/Background';
import useToggle, { HandleToggle } from '@/hooks/useToggle';
import CloseIcon from '@/icons/CloseIcon';
import Radio from '@/components/Radio';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeWatermarkAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import useModalWindow from '@/hooks/useModalWindow';

interface Props {
  hide: HandleToggle,
  albumName: string,
  isNested?: boolean
}

type Services = 'album' | 'photo';

const PurchasingWindow: React.FC<Props> = ({ hide, albumName, isNested = false }) => {
  const [whatIsPurchasing, setWhatIsPurchasing] = useState<Services>('album');
  const [isLoading, toggleIsLoading] = useToggle();
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  if (!isNested) useModalWindow();

  const submitPurchasing = () => {
    toggleIsLoading(true);

    dispatch(removeWatermarkAction({
      albumName,
      callback: hide
    }));
  };

  useEffect(() => {
    if (error) toggleIsLoading(false);
  }, [error]);

  return (
    <Background onClick={hide}>
      <StyledPurchasingWindow onClick={(evt) => evt.stopPropagation()}>
        <CloseIconDiv onClick={hide}>
          <CloseIcon stroke="#262626"/>
        </CloseIconDiv>
        <Title>Unlock your photos</Title>
        <Description>Download, view and share your photos in hi-resolution with no watermark.</Description>
        <RadioWrapper disabled checked={whatIsPurchasing === 'photo'}>
          <Radio
            disabled
            name="Current Photo"
          />
          1$
        </RadioWrapper>
        <RadioWrapper checked={whatIsPurchasing === 'album'}>
          <Radio
            name={`All 5 photos from ${albumName}`}
            onClick={() => setWhatIsPurchasing('album')}
            checked={whatIsPurchasing === 'album'}
          />
          5$
        </RadioWrapper>
        <StyledButton onClick={submitPurchasing}>
          {isLoading ? <Loader /> : 'Unlock all photos'}
        </StyledButton>
      </StyledPurchasingWindow>
    </Background>
  );
};

const StyledPurchasingWindow = styled.div`
  position: fixed;
  padding: 20px 15px 40px;
  right: 0;
  bottom: -20px;
  left: 0;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  cursor: default;
  z-index: 1000;
  
  @media (min-width: 480px) {
    top: 50%;
    bottom: unset;
    left: 50%;
    padding: 20px 20px 20px;
    max-width: 420px;
    transform: translate(-50%, -50%);
    border-radius: 20px;
  }
`;

const CloseIconDiv = styled.div`
  position: absolute;
  top: 20px;
  left: 15px;
  cursor: pointer;
  
  @media (min-width: 480px) {
    left: 20px;
  }
`;

const Title = styled.p`
  margin-bottom: 20px;
  padding: 0 40px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const RadioWrapper = styled.div<{ checked: boolean, disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${({ checked, disabled }) => disabled ? '#BBB' : checked ? '#3300CC' : 'inherit'}
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

export default PurchasingWindow;
