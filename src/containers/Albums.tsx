import React from 'react';
import { Routes, Route } from 'react-router';
import AlbumsPage from '@/components/AlbumsPage';
import SelectedAlbumPage from '@/components/SelectedAlbumPage';

const Albums = () => {
  return (
    <Routes>
      <Route path="/" element={<AlbumsPage />} />
      <Route path="/albums/:albumName" element={<SelectedAlbumPage />} />
    </Routes>
  );
};

export default Albums;
