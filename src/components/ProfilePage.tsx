import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTempUserName, selectTempUserPhoto, selectUser } from '@/store/selectors/userSelector';
import PageTitle from '@/components/PageTitle';
import EditIcon from '@/icons/EditIcon';
import BackIcon from '@/icons/BackIcon';
import CropperWindow from '@/components/CropperWindow';
import Loader from '@/components/Loader';
import heicConverter from '@/utils/heicConverter';

const ProfilePage = () => {
  const [chosenPhoto, setChosenPhoto] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const tempPhoto = useSelector(selectTempUserPhoto);
  const tempName = useSelector(selectTempUserName);

  const setting = [
    {
      title: 'Your name',
      description: 'Tell us your name to personalize communications.',
      action: () => navigate('/profile/changeName')
    },
    {
      title: 'Account settings',
      description: 'Update your phone and email',
      action: () => navigate('/profile/settings')
    },
    {
      title: 'Notification settings',
      description: 'How should we contact you?',
      disabled: true,
      action: () => {}
    },
  ];

  const selectPhotoHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      const splitName = file.name.split('.');
      const type = file.type || `image/${splitName[splitName.length - 1]}`;
      let url;

      if (new RegExp(/^image\/.*$/).test(type)) {
        if (file.name.endsWith('.heic')) {
          heicConverter(file).then(result => {
            setChosenPhoto(result);
          });
        } else {
          url = URL.createObjectURL(file);
          setChosenPhoto(url);
        }
      }
    } else console.log(evt.target);
  };

  const name = tempName || user?.fullName;

  return user ? (
    <StyledProfile>
      <PageTitle marginBottom={20}>
        {`Welcome${name ? `, ${name}` : ''}`}
      </PageTitle>
      <Description>Your selfie</Description>
      <PhotoLabel url={tempPhoto || user.selfie!}>
        <input type="file" multiple={false} accept="image/*,.heic,.heif" onChange={selectPhotoHandler}/>
        <EditIcon />
      </PhotoLabel>
      <Settings>
        {setting.map((el, i) => (
          <SettingItem isDisabled={!!el.disabled} onClick={el.action} key={i}>
            <SettingTitle>{el.title}</SettingTitle>
            <SettingDescription>{el.description}</SettingDescription>
            <BackIcon />
          </SettingItem>
        ))}
      </Settings>
      {chosenPhoto ? (
        <CropperWindow hide={() => setChosenPhoto(null)} filePath={chosenPhoto} withoutRouting />
      ) : ''}
    </StyledProfile>
  ) : <Loader />;
};

const StyledProfile = styled.div`
  margin: 0 auto;
  padding: 20px 0 0;
  max-width: 375px;
  width: 100%;
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

const SettingItem = styled.li<{ isDisabled: boolean }>`
  position: relative;
  padding: 10px 40px 10px 15px;
  border: 1px solid #CECCB5;
  border-radius: 10px;
  cursor: ${({ isDisabled }) => isDisabled ? 'default' : 'pointer'};
  ${({ isDisabled }) => isDisabled ? 'opacity: .5' : ''};

  :hover {
    ${({ isDisabled }) => isDisabled ? '' : 'border: 1px solid #3300CC'};
  }
  
  svg {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%) rotate(180deg);
  }
`;

const SettingTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const SettingDescription = styled.p`
  font-size: 14px;
`;

export default ProfilePage;
