import React from 'react';
import { Routes, Route } from 'react-router';

import SettingsPage from '@/components/SettingsPage';
import SetEmail from '@/components/SetEmail';
import { PhoneNumber } from '@/store/reducers/user';
import Auth from '@/containers/Auth';

interface Props {
  userPhone: PhoneNumber,
  userEmail?: string,
  userName?: string
}

const Settings: React.FC<Props> = ({ userPhone, userEmail, userName }) => {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage userPhone={userPhone} userEmail={userEmail} />} />
      <Route path="/changePhone/*" element={<Auth isItChanging />} />
      <Route path="/changeEmail" element={<SetEmail isChanging userEmail={userEmail} userName={userName} />} />
    </Routes>
  );
};

export default Settings;
