import React from 'react';
import useToggle from '@/hooks/useToggle';
import styled from 'styled-components';

interface Props {
  source: string,
  altText: string,
  albumName?: string
}

const AlbumsListItem: React.FC<Props> = ({ source, altText, albumName }) => {
  const [isLoaded, toggleIsLoaded] = useToggle();

  return (
    <StyledAlbumsListItem style={{ display: isLoaded ? 'block' : 'none' }}>
      {albumName ? (
        <>
          <Shadow />
          <Title>{albumName}</Title>
        </>
      ) : ''}
      <img
        src={source}
        alt={altText}
        onLoad={toggleIsLoaded as unknown as React.ReactEventHandler<HTMLImageElement>}
      />
    </StyledAlbumsListItem>
  );
};

const StyledAlbumsListItem = styled.li`
  position: relative;
  width: 200px;
  height: 255px;
  flex-shrink: 0;

  img {
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  @media (max-width: 420px) {
    width: 110px;
    height: 140px;
  }
`;

const Title = styled.p`
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 15px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Shadow = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 133px;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 44.34%, rgba(0, 0, 0, 0) 100%);

  @media (max-width: 768px) {
    height: 73px;
  }
`;

export default AlbumsListItem;
