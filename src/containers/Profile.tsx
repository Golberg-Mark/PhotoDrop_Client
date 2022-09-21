import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router';

import ProfilePage from '@/components/ProfilePage';
import SetName from '@/components/SetName';
import { selectTempUserEmail, selectTempUserName, selectUser } from '@/store/selectors/userSelector';
import SetEmail from '@/components/SetEmail';

const Profile = () => {
  const user = useSelector(selectUser);
  const tempName = useSelector(selectTempUserName);
  const tempEmail = useSelector(selectTempUserEmail);

  const name = tempName || user?.name;
  const email = tempEmail || user?.email;

  return (
    <>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/changeName" element={<SetName isChanging userName={name} />} />
        <Route path="/settings" element={<SetEmail isChanging userEmail={email} />} />
        <Route path="/notifications" element={<div>Notifications</div>} />
      </Routes>
    </>
  );
};

export default Profile;
