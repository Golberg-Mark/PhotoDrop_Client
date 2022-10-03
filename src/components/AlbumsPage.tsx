import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DropSoonIcon from '@/icons/DropSoonIcon';
import PageTitle from '@/components/PageTitle';
import { selectAlbums, selectAllPhotos } from '@/store/selectors/userSelector';
import { getAlbumsAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import AlbumsListItem from '@/components/Albums/AlbumsListItem';
import PhotoViewer from '@/components/PhotoViewer';
import { Photo } from '@/store/reducers/user';

const AlbumsPage = () => {
  const [photosPage, setPhotosPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const albums = useSelector(selectAlbums);
  const allPhotos = useSelector(selectAllPhotos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!albums || !allPhotos) dispatch(getAlbumsAction());
  }, []);

  const getContent = useCallback(() => {
      if (albums === null) return <Loader marginTop={-20} />;
      if (albums.length === 0) {
        const artPrintsList = ['FirstArtPrint.png', 'SecondArtPrint.png', 'ThirdArtPrint.png'];

        return (
          <>
            <EmptyAlbums>
              <Icon>
                <DropSoonIcon />
              </Icon>
              <PageTitle marginBottom={16}>
                Your photos will drop soon.
              </PageTitle>
              <Description>
                You will get a text message when they are ready. It can take up to 48 hours.
              </Description>
            </EmptyAlbums>
            <BrowseArtPrints>
              <PageTitle textAlign="left" marginBottom={20} >
                Browse Art Prints
              </PageTitle>
              <AlbumsList>
                {artPrintsList.map((el) => (
                  <AlbumsListItem key={el} source={`/assets/${el}`} altText="Art Print" />
                ))}
              </AlbumsList>
            </BrowseArtPrints>
          </>
        );
      } else {
        let photos = [];

        if (allPhotos) {
          for (let i = 0; i < photosPage * 12; i++) {
            if (allPhotos[i]) photos.push(
              <img
                key={allPhotos[i].url}
                src={allPhotos[i].url}
                alt="Your Photo"
                onClick={() => setSelectedPhoto(allPhotos[i])}
              />
            );
            else break;
          }
        }

        return (
          <NonEmptyAlbums>
            <PageTitle fontSize={18} textAlign="left" marginBottom={20}>
              Albums
            </PageTitle>
            <AlbumsList withMarginBottom>
              {albums.map((el, i) => (
                <Link to={`/albums/${el.id}`} key={`${el.name + i}`}>
                  <AlbumsListItem albumName={el.name} source={el.image} altText={el.name} />
                </Link>
              ))}
            </AlbumsList>
            <PageTitle fontSize={18} textAlign="left" marginBottom={20}>
              All photos
            </PageTitle>
            <PhotoList>
              {photos}
            </PhotoList>
            {allPhotos?.length !== photos.length ? (
              <Button
                style={{ display: 'block', margin: '0 auto' }}
                onClick={() => setPhotosPage(prevState => ++prevState)}
              >
                Show more
              </Button>
            ) : ''}
          </NonEmptyAlbums>
        );
      }
  }, [albums, allPhotos, photosPage]);

  return (
    <StyledAlbumsPage>
      {getContent()}
      {selectedPhoto ? (
        <PhotoViewer
          hide={() => setSelectedPhoto(null)}
          photo={selectedPhoto.url}
          albumInfo={selectedPhoto.watermark ? {
            id: selectedPhoto.albumId,
            albumName: selectedPhoto.albumName,
            photosAmount: selectedPhoto.countAlbumPhotos
          } : undefined}
        />
      ) : ''}
    </StyledAlbumsPage>
  );
};

const StyledAlbumsPage = styled.div`
  padding-top: 20px;
  min-height: 100vh;
`;

const EmptyAlbums = styled.div`
  width: calc(100vw - 15px);
  margin-bottom: 40px;
  margin-left: -15px;
  padding: 0 15px 40px;
  border-bottom: 5px solid #F4F4F4;

  @media (min-width: 420px) {
    width: 100%;
    margin-left: 0;
    padding: 0 0 40px;
    border: none;
  }
`;

const Icon = styled.div`
  margin: 0 auto 20px auto;
  width: fit-content;
`;

const Description = styled.p`
  margin: 0 auto;
  max-width: 345px;
  text-align: center;
`;

const BrowseArtPrints = styled.div`
  padding-bottom: 60px;
`;

const AlbumsList = styled.ul<{ withMarginBottom?: boolean }>`
  display: flex;
  grid-gap: 5px;
  ${({ withMarginBottom }) => withMarginBottom ? 'margin-bottom: 40px;' : ''}
  margin-left: -15px;
  padding: 0 15px;
  width: calc(100% + 30px);
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding: 0;
    ${({ withMarginBottom }) => withMarginBottom ? 'margin-bottom: 100px;' : ''}
  }
`;

const NonEmptyAlbums = styled.div`
  margin-bottom: 100px;
`;

const PhotoList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 -15px 40px;

  img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    margin: 0 0 100px;
  }
`;

export default AlbumsPage;
