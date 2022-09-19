import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import PageTitle from '@/components/PageTitle';
import { useSelector } from 'react-redux';
import { selectTempUserPhoto, selectUser } from '@/store/selectors/userSelector';
import EditIcon from '@/icons/EditIcon';
import Loader from '@/components/Loader';
import useToggle from '@/hooks/useToggle';
import CropperWindow from '@/components/CropperWindow';

const Profile = () => {
  const [chosenPhoto, setChosenPhoto] = useState<string | null>(null);
  const [isNameChangerVisible, toggleIsNameChangerVisible] = useToggle();
  const [isAccountSettingsVisible, toggleIsAccountSettingsVisible] = useToggle();
  const [isNotificationSettingsVisible, toggleIsNotificationSettingsVisible] = useToggle();
  const user = useSelector(selectUser);
  const tempPhoto = useSelector(selectTempUserPhoto);

  const setting = [
    {
      title: 'Your name',
      description: 'Tell us your name to personalize communications.',
      action: () => toggleIsNameChangerVisible(true)
    },
    {
      title: 'Account settings',
      description: 'Update your phone and email',
      action: () => toggleIsAccountSettingsVisible(true)
    },
    {
      title: 'Notification settings',
      description: 'How should we contact you?',
      action: () => toggleIsNotificationSettingsVisible(true)
    },
  ];

  const selectPhotoHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const url = URL.createObjectURL(evt.target.files[0]);

      setChosenPhoto(url);
    }
  };

  return user ? (
    <StyledProfile>
      <PageTitle marginBottom={20}>
        {`Welcome${user.name ? `, ${user.name}` : ''}`}
      </PageTitle>
      <Description>Your selfie</Description>
      <PhotoLabel url={tempPhoto || user.selfie!}>
        <input type="file" multiple={false} onChange={selectPhotoHandler}/>
        <EditIcon />
      </PhotoLabel>
      <Settings>
        {setting.map((el, i) => (
          <SettingItem onClick={el.action} key={i}>
            <SettingTitle>{el.title}</SettingTitle>
            <SettingDescription>{el.description}</SettingDescription>
          </SettingItem>
        ))}
      </Settings>
      {chosenPhoto ? (
        <CropperWindow hide={() => setChosenPhoto(null)} filePath={chosenPhoto} />
      ) : ''}
    </StyledProfile>
  ) : <Loader />;
};

const StyledProfile = styled.div`
  padding: 20px 0 0;
`;

const Description = styled.p`
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 500;
`;

const PhotoLabel = styled.label<{ url: string }>`
  position: relative;
  display: block;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  cursor: pointer;

  svg {
    position: absolute;
    right: -15px;
    bottom: -3px;
  }

  input {
    display: none;
  }
`;

const Settings = styled.ul`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
`;

const SettingItem = styled.li`
  padding: 10px 25px 10px 15px;
  border: 1px solid #CECCB5;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    border: 1px solid #3300CC;
  }
`;

const SettingTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const SettingDescription = styled.p`
  font-size: 14px;
`;

export default Profile;
