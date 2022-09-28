import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DropSoonIcon from '@/icons/DropSoonIcon';
import PageTitle from '@/components/PageTitle';
import { selectAlbums } from '@/store/selectors/userSelector';
import { getAlbumsAction, userActions } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import AlbumsListItem from '@/components/Albums/AlbumsListItem';
import PhotoViewer from '@/components/PhotoViewer';

interface PhotoData {
  url: string,
  album?: string
}

const AlbumsPage = () => {
  const [photosPage, setPhotosPage] = useState(1);
  const [photoLinks, setPhotoLinks] = useState<PhotoData[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const albums = useSelector(selectAlbums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumsAction());

    return () => {
      dispatch(userActions.setAlbums(null));
    }
  }, []);

  useEffect(() => {
    if (albums?.length) {
      let photos: PhotoData[] = [];

      albums.forEach((album) => {
        album.photos.forEach((photo) => {
          photos.push({
            url: photo.url,
            album: photo.watermark ? album.name : undefined
          })
        });
      });

      setPhotoLinks(photos);
    }
  }, [albums]);

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

        for (let i = 0; i < photosPage * 3; i++) {
          if (photoLinks[i]) photos.push(
            <img
              key={photoLinks[i].url}
              src={photoLinks[i].url}
              alt="Your Photo"
              onClick={() => setSelectedPhoto(photoLinks[i])}
            />
          );
          else break;
        }

        return (
          <NonEmptyAlbums>
            <PageTitle fontSize={18} textAlign="left" marginBottom={20}>
              Albums
            </PageTitle>
            <AlbumsList withMarginBottom>
              {albums.map((el, i) => (
                <Link to={`/albums/${el.name}`} key={`${el.name + i}`}>
                  <AlbumsListItem albumName={el.name} source={el.photos[0].url} altText={el.name} />
                </Link>
              ))}
            </AlbumsList>
            <PageTitle fontSize={18} textAlign="left" marginBottom={20}>
              All photos
            </PageTitle>
            <PhotoList>
              {photos}
            </PhotoList>
            {photoLinks.length !== photos.length ? (
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
  }, [albums, photoLinks, photosPage]);

  return (
    <StyledAlbumsPage>
      {getContent()}
      {selectedPhoto ? (
        <PhotoViewer
          hide={() => setSelectedPhoto(null)}
          photo={selectedPhoto.url}
          albumName={selectedPhoto.album}
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
  margin-bottom: 40px;

  img {
    object-fit: cover;
    aspect-ratio: 1 / 1;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    margin-bottom: 100px;
  }
`;

export default AlbumsPage;
