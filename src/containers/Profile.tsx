import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router';

import ProfilePage from '@/components/ProfilePage';
import SetName from '@/components/SetName';
import { selectTempUserName, selectUser } from '@/store/selectors/userSelector';

const Profile = () => {
  const user = useSelector(selectUser);
  const tempName = useSelector(selectTempUserName);

  const name = tempName || user?.name;

  return (
    <>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/changeName" element={<SetName isChanging userName={name} />} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/notifications" element={<div>Notifications</div>} />
      </Routes>
    </>
  );
};

export default Profile;
