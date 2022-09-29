import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getSelectedAlbumAction, userActions } from '@/store/actions/userActions';
import { selectSelectedAlbum } from '@/store/selectors/userSelector';
import Loader from '@/components/Loader';
import BackIcon from '@/icons/BackIcon';
import PageTitle from '@/components/PageTitle';
import getMonth from '@/utils/getMonth';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import useToggle from '@/hooks/useToggle';
import PurchasingWindow from '@/components/PurchasingWindow';
import PhotoViewer from '@/components/PhotoViewer';

const SelectedAlbumPage = () => {
  const [isPurchasingVisible, toggleIsPurchasingVisible] = useToggle();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { albumName } = useParams();
  const navigate = useNavigate();
  const selectedAlbum = useSelector(selectSelectedAlbum);
  const dispatch = useDispatch();

  useEffect(() => {
    if (albumName && !selectedAlbum) dispatch(getSelectedAlbumAction(albumName));

    return () => {
      dispatch(userActions.setSelectedAlbum(null));
    }
  }, []);

  let albumInfo = '';
  let photosStr = '';

  if (selectedAlbum) {
    const date = new Date(selectedAlbum.date);
    photosStr = `${selectedAlbum.photos.length} photos`;

    if (selectedAlbum.photos.length === 0) photosStr = photosStr.substring(0, photosStr.length - 2);
    albumInfo = `${getMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} • `;
  }

  const isUnlocked = selectedAlbum?.photos[0].watermark;

  return selectedAlbum ? (
    <StyledSelectedAlbumPage>
      <AlbumHeader>
        <BackIconWrapper>
          <BackIcon onClick={() => navigate(-1)} />
        </BackIconWrapper>
        <AllAlbumInfo>
          <PageTitle textAlign="left">
            {selectedAlbum.name}
          </PageTitle>
          <Info>
            {albumInfo}
            <span>{photosStr}</span>
          </Info>
        </AllAlbumInfo>
        {isUnlocked ? <UnlockYourPhoto onClick={toggleIsPurchasingVisible}>Unlock your photos</UnlockYourPhoto> : ''}
      </AlbumHeader>
      <PhotoList>
        {selectedAlbum.photos.map((el, i) => (
          <img key={i} src={el.url} alt="Your Photo" onClick={() => setSelectedPhoto(el.url)}/>
        ))}
      </PhotoList>
      {isUnlocked ? (
        <StyledButton onClick={toggleIsPurchasingVisible}>
          Unlock your photos
        </StyledButton>
      ) : null}
      {isPurchasingVisible ? (
        <PurchasingWindow hide={toggleIsPurchasingVisible} albumName={selectedAlbum.name} />
      ) : ''}
      {selectedPhoto ? (
        <PhotoViewer hide={() => setSelectedPhoto(null)} photo={selectedPhoto} albumName={albumName}/>
      ) : ''}
    </StyledSelectedAlbumPage>
  ) : <StyledSelectedAlbumPage><Loader /></StyledSelectedAlbumPage>;
};

const StyledSelectedAlbumPage = styled.div`
  min-height: 100vh;
`;

const AlbumHeader = styled.div`
  display: flex;
  grid-gap: 15px;
  align-items: center;
  padding: 15px 18px;
  min-height: 55px;

  h2 {
    margin-bottom: 4px;
  }

  svg {
    position: absolute;
    top: 50%;
    left: -23px;
    transform: translateY(-50%);
  }

  @media (min-width: 768px) {
    justify-content: space-between;
    grid-gap: 100px;
    padding: 15px 0;
    min-height: 60px;

    h2 {
      margin: 0;
    }

    svg {
      left: -70px;
    }
  }
`;

const BackIconWrapper = styled.div`
  position: absolute;
`;

const AllAlbumInfo = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: baseline;
    grid-gap: 40px;
  }
`;

const Info = styled.div`
  font-size: 14px;

  span {
    font-size: 14px;
    color: #3300CC;
  }

  @media (min-width: 768px) {
    font-size: 16px;

    span {
      font-size: 16px;
    }
  }
`;

const UnlockYourPhoto = styled(Button)`
  display: none;

  @media (min-width: 768px) {
    display: block;
    align-self: flex-end;
    padding: 0;
    width: auto;
    height: auto;
    font-size: 18px;
    color: #3300CC;
    font-weight: 500;
    text-align: right;
    background-color: transparent;
  }
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
    margin: 0 0 100px 0;
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto 40px;

  @media (min-width: 480px) {
    margin: 0 auto 100px;
  }
`;

export default SelectedAlbumPage;
