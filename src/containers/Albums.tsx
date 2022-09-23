import React from 'react';
import { Routes, Route } from 'react-router';
import AlbumsPage from '@/components/AlbumsPage';

const Albums = () => {
  return (
    <Routes>
      <Route path="/" element={<AlbumsPage />} />
      <Route path="/albums/:albumName" element={<div>ALBUM PAGE</div>} />
    </Routes>
  );
};

export default Albums;
