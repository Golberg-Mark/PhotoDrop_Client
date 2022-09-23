import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import DropSoonIcon from '@/icons/DropSoonIcon';
import PageTitle from '@/components/PageTitle';
import { selectAlbums } from '@/store/selectors/userSelector';
import { getAlbumsAction, userActions } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import FirstArtPrint from '/assets/FirstArtPrint.png';
import SecondArtPrint from '/assets/SecondArtPrint.png';
import ThirdArtPrint from '/assets/ThirdArtPrint.png';

const AlbumsPage = () => {
  const albums = useSelector(selectAlbums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumsAction());

    return () => {
      dispatch(userActions.setAlbums(null));
    }
  }, []);

  const getContent = useCallback(() => {
      if (albums === null) return <Loader />;
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
                  <AlbumsListItem key={el}>
                    <img src={`/assets/${el}`} alt="Art Print"/>
                  </AlbumsListItem>
                ))}
              </AlbumsList>
            </BrowseArtPrints>
          </>
        );
      } else return (
        <div>MEM</div>
      );
  }, [albums]);

  return (
    <StyledAlbumsPage>
      {getContent()}
    </StyledAlbumsPage>
  );
};

const StyledAlbumsPage = styled.div`
  padding-top: 20px;
  min-height: 100%;
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

const AlbumsList = styled.ul`
  display: flex;
  grid-gap: 5px;
  margin-left: -15px;
  padding: 0 15px;
  width: calc(100% + 30px);
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const AlbumsListItem = styled.li`
  width: 167px;
  height: 215px;
  flex-shrink: 0;
  
  img {
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export default AlbumsPage;
