import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@/icons/CloseIcon';
import useToggle, { HandleToggle } from '@/hooks/useToggle';
import PurchasingWindow from '@/components/PurchasingWindow';
import DownloadIcon from '@/icons/DownloadIcon';
import ShareIcon from '@/icons/ShareIcon';
import useModalWindow from '@/hooks/useModalWindow';

interface Props {
  hide: HandleToggle,
  photo: string,
  albumInfo?: {
    id: string,
    albumName: string,
    photosAmount: number
  }
}

const PhotoViewer: React.FC<Props> = ({ albumInfo, photo, hide }) => {
  const [photoObject, setPhotoObject] = useState<string>();
  const [isPurchasingVisible, toggleIsPurchasingVisible] = useToggle();

  useModalWindow();

  useEffect(() => {
    const getPhoto = async () => {
      return await fetch(photo).then(response => response.blob()).then(result => URL.createObjectURL(result));
    }

    getPhoto().then(result => setPhotoObject(result));
  }, []);

  const download = () => {
    if (photoObject) {
      const a = document.createElement('a');
      a.href = photoObject;
      a.download = 'Photo';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        url: photo
      });
    }
  };

  return (
    <StyledPhotoViewer>
      <CloseIcon onClick={hide as unknown as React.MouseEventHandler<HTMLOrSVGElement>} />
      <Image src={photo} alt="Your Photo" />
      <Buttons>
        {albumInfo ? (
          <Button onClick={toggleIsPurchasingVisible}>
            Unlock your photos
          </Button>
        ) : (
          <>
            <IconWrapper onClick={download}>
              <DownloadIcon />
              Download
            </IconWrapper>
            {window.innerWidth < 768 ? (
              <IconWrapper onClick={share}>
                <ShareIcon />
                Share
              </IconWrapper>
            ) : ''}
            <Button alternativeStyle onClick={() => window.open(photo)}>
              See in frame
            </Button>
          </>
        )}
      </Buttons>
      {isPurchasingVisible ? <PurchasingWindow hide={toggleIsPurchasingVisible} albumInfo={albumInfo!} isNested/> : ''}
    </StyledPhotoViewer>
  );
};

const StyledPhotoViewer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-rows: auto 110px;
  padding: 60px 0 0;
  background-color: #111;
  z-index: 1001;

  & > svg {
    position: absolute;
    top: 20px;
    left: 15px;
    cursor: pointer;
  }
  
  @media (min-width: 480px) {
    padding: 0 45px;
  }
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  max-height: calc(100vh - 180px);
  object-fit: contain;
  align-self: center;
  max-width: 1440px;
`;

const Button = styled.button<{ alternativeStyle?: boolean }>`
  align-self: center;
  padding: 16px 40px;
  width: 100%;
  height: 50px;
  color: ${({ alternativeStyle }) => alternativeStyle ? '#fff' : '#262626'};
  border: ${({ alternativeStyle }) => alternativeStyle ? '1px solid #fff' : 'none'};
  border-radius: 50px;
  background-color: ${({ alternativeStyle }) => alternativeStyle ? 'transparent' : '#fff'};
  cursor: pointer;
  
  @media (min-width: 420px) {
    max-width: 300px;
  }
  
  @media (min-width: 768px) {
    :hover {
      color: ${({ alternativeStyle }) => alternativeStyle ? '#fff' : '#3300CC'};
      border: ${({ alternativeStyle }) => alternativeStyle ? '1px solid #3300EE' : 'none'};
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 15px 30px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 4px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  
  @media (min-width: 768px) {
    :hover {
      color: #3300EE;

      path, rect {
        fill: #3300EE;
      }
    }
  }
`;

export default PhotoViewer;
