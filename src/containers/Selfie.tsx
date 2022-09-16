import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PageTitle from '@/components/PageTitle';
import useToggle from '@/hooks/useToggle';
import CropperWindow from '@/components/CropperWindow';

const Selfie = () => {
  const [file, setFile] = useState<string | null>(null);
  const [isCropperVisible, toggleIsCropperVisible] = useToggle();

  const inputFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.item(0)) {
      const url = URL.createObjectURL(evt.target.files[0]);

      setFile(url);
    } else console.log(evt);
  };

  useEffect(() => {
    if (file) toggleIsCropperVisible(true);
    else toggleIsCropperVisible(false);
  }, [file]);

  const stop = (evt: React.MouseEvent) => {
    evt.preventDefault();
  };

  return (
    <StyledSelfie>
      <PageTitle>Add a selfie</PageTitle>
      <Description>A selfie allows your photos to be synced with your account.</Description>
      <ImageContainer onClick={isCropperVisible ? stop : undefined} isDisabled={isCropperVisible}>
        <input type="file" onChange={inputFile} multiple={false} />
        <img src={'/assets/selfie.png'} alt="Selfie icon"/>
      </ImageContainer>
      {isCropperVisible ? (
        <CropperWindow hide={toggleIsCropperVisible} filePath={file!} />
      ) : ''}
    </StyledSelfie>
  );
};

const StyledSelfie = styled.div`
  padding: 72px 0 0;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  text-align: center;
`;

const ImageContainer = styled.label<{ isDisabled: boolean }>`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 181px;
  cursor: pointer;
  z-index: ${({ isDisabled }) => isDisabled ? '-1' : '0'};

  ::after {
    content: '+';
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    font-size: 38px;
    color: #fff;
    border-radius: 50%;
    background-color: #3300CC;
  }

  input {
    display: none;
  }
`;

export default Selfie;
