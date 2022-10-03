import React from 'react';
import { Routes, Route } from 'react-router';

import AlbumsPage from '@/components/AlbumsPage';
import SelectedAlbumPage from '@/components/SelectedAlbumPage';
import ThanksPage from '@/components/ThanksPage';

const Albums = () => {
  return (
    <Routes>
      <Route path="/" element={<AlbumsPage />} />
      <Route path="/albums/thanks" element={<ThanksPage />} />
      <Route path="/albums/:id" element={<SelectedAlbumPage />} />
    </Routes>
  );
};

export default Albums;
