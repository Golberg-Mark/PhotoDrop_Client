import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router';

import ProfilePage from '@/components/ProfilePage';
import SetName from '@/components/SetName';
import { selectTempUserEmail, selectTempUserName, selectUser } from '@/store/selectors/userSelector';
import Loader from '@/components/Loader';
import Settings from '@/containers/Settings';

const Profile = () => {
  const user = useSelector(selectUser);
  const tempName = useSelector(selectTempUserName);
  const tempEmail = useSelector(selectTempUserEmail);

  const name = tempName || user?.fullName;
  const email = tempEmail || user?.email;

  return user ? (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/changeName" element={<SetName isChanging userName={name} />} />
      <Route path="/settings/*" element={<Settings userPhone={user.number} userEmail={email} />} />
      <Route path="/notifications" element={<div>Notifications</div>} />
    </Routes>
  ) : <Loader />;
};

export default Profile;
