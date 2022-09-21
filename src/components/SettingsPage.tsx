import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import PageTitle from '@/components/PageTitle';
import PhoneIcon from '@/icons/PhoneIcon';
import EmailIcon from '@/icons/EmailIcon';
import { PhoneNumber } from '@/store/reducers/user';
import formatPhoneNumber from '@/utils/formatPhoneNumber';

interface Props {
  userPhone: PhoneNumber,
  userEmail?: string
}

const SettingsPage: React.FC<Props> = ({ userPhone, userEmail = '' }) => {
  const navigate = useNavigate();

  const settings = [
    {
      title: 'Phone',
      currentValue: formatPhoneNumber(userPhone.countryCode + userPhone.phoneNumber, userPhone.countryCode),
      icon: <PhoneIcon />,
      action: () => navigate('/profile/settings/changePhone')
    },
    {
      title: 'Email',
      currentValue: userEmail,
      icon: <EmailIcon />,
      action: () => navigate('/profile/settings/changeEmail')
    }
  ];

  return (
    <StyledSettings>
      <PageTitle marginBottom={20}>
        Account settings
      </PageTitle>
      <SettingsList>
        {settings.map((el, i) => (
          <SettingItem key={i} onClick={el.action}>
            {el.icon}
            <SettingTitle>{el.title}</SettingTitle>
            <SettingDescription>{el.currentValue}</SettingDescription>
          </SettingItem>
        ))}
      </SettingsList>
    </StyledSettings>
  );
};

const StyledSettings = styled.div`
  margin: 0 auto;
  padding: 20px 0 0;
  max-width: 375px;
  width: 100%;
`;

const SettingsList = styled.ul`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
`;

const SettingItem = styled.li`
  position: relative;
  padding: 10px 40px 10px 50px;
  border: 1px solid #CECCB5;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    border: 1px solid #3300CC;
  }
  
  svg {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }
`;

const SettingTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const SettingDescription = styled.p`
  font-size: 14px;
`;

export default SettingsPage;
