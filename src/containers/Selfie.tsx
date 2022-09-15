import React, { useState } from 'react';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';

const Selfie = () => {
  const [file, setFile] = useState(null);

  const inputFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.files);
  };

  return (
    <StyledSelfie>
      <PageTitle>Add a selfie</PageTitle>
      <Description>A selfie allows your photos to be synced with your account.</Description>
      <ImageContainer>
        <input type="file" onChange={inputFile} />
        <img src={'/assets/selfie.png'} alt="Selfie icon"/>
      </ImageContainer>
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

const ImageContainer = styled.label`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 181px;
  cursor: pointer;
  
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
