import React from 'react';
import { Routes, Route } from 'react-router';

import AlbumsPage from '@/components/AlbumsPage';
import SelectedAlbumPage from '@/components/SelectedAlbumPage';
import ThanksPage from '@/components/ThanksPage';
import FailedCheckoutPage from '@/components/FailedCheckoutPage';

const Albums = () => {
  return (
    <Routes>
      <Route path="/" element={<AlbumsPage />} />
      <Route path="/purchase/:albumName" element={<ThanksPage />} />
      <Route path="/purchase-failed/:albumName" element={<FailedCheckoutPage />} />
      <Route path="/albums/:id" element={<SelectedAlbumPage />} />
    </Routes>
  );
};

export default Albums;
