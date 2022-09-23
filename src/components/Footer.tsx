import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '@/components/PageTitle';
import FrameologyIcon from '@/icons/FrameologyIcon';
import ClimateNeutralLogo from '@/icons/ClimateNeutralLogo';

const Footer = () => {
  const { pathname } = useLocation();
  const regexp = new RegExp(/^\/albums\/.*$/);

  return pathname === '/' || regexp.test(pathname) ? (
    <StyledFooter>
      <Container>
        <MainInformation>
          <PageTitle fontSize={28} textAlign="left" marginBottom={20}>
            PhotoDrop is brought to you by
          </PageTitle>
          <FrameologyIcon />
          <Description>
            Our mission is to help people connect with their memories. If you framing some of the photos
            from your experience, please consider using Frameology. It supports the photographers and makes
            PhotoDrop possible.
          </Description>
          <Button>
            Order photos
          </Button>
        </MainInformation>
        <AdditionalInformation>
          <p>Questions? Get in touch - hello@photodrop.me</p>
          <ClimateNeutralLogo />
          <StyledTermLinks to="/terms">
            Terms of services
          </StyledTermLinks>
          <StyledTermLinks to="/privacy">
            Privacy Party
          </StyledTermLinks>
        </AdditionalInformation>
        <p>© {new Date().getFullYear()} FOM Online Inc</p>
      </Container>
    </StyledFooter>
  ) : <></>;
};

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  background-color: #262626;
`;

const Container = styled.div`
  display: grid;
  grid-gap: 60px;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  margin: 0 auto;
  padding: 60px 15px 40px;
  max-width: 790px;
  width: 100%;
  
  * {
    color: #fff;
  }

  @media (max-width: 640px) {
    grid-gap: 40px;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    padding: 40px 15px 20px 15px;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 22px;
    }
  }
`;

const MainInformation = styled.div`
  max-width: 420px;
  
  svg {
    margin-bottom: 20px;
  }
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: -.02em;
  
  @media (max-width: 640px) {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 18px 50px;
  max-width: 300px;
  width: 100%;
  border: 1px solid #fff;
  border-radius: 50px;
  background-color: transparent;
  cursor: pointer;
`;

const AdditionalInformation = styled.div`
  max-width: 310px;
  
  p {
    margin-bottom: 20px;
  }
  
  svg {
    margin-bottom: 30px;
  }
`;

const StyledTermLinks = styled(Link)`
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
  
  :hover {
    color: #3300CC;
  }
`;

export default Footer;
