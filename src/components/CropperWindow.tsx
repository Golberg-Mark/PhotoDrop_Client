import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Cropper, { Area } from 'react-easy-crop';
import { HandleToggle } from '@/hooks/useToggle';
import CloseIcon from '@/icons/CloseIcon';
import getCroppedImg from '@/utils/getCroppedImage';

interface Props {
  hide: HandleToggle,
  filePath: string
}

const CropperWindow: React.FC<Props> = ({ filePath, hide }) => {
  const [path, setPath] = useState(filePath);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        path,
        croppedAreaPixels
      );
      console.log('donee', { croppedImage });
      /*TODO: upload cropped image to s3*/
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const setNewImage = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.item(0)) {
      const url = URL.createObjectURL(evt.target.files[0]);

      setPath(url);
    } else setPath(filePath);
  };

  return path ? (
    <StyledCropperWindow>
      <div>
        <WindowHeader>
          <Close onClick={hide}>
            <CloseIcon />
          </Close>
          <HeaderText>
            <span>Take selfie</span>
          </HeaderText>
        </WindowHeader>
        <Description>Drag and zoom image to crop</Description>
        <Cropper
          image={path}
          aspect={4 / 3}
          crop={crop}
          onCropChange={setCrop}
          zoom={zoom}
          onZoomChange={setZoom}
          cropShape="round"
          showGrid={false}
          onCropComplete={cropComplete}
        />
      </div>
      <Buttons>
        <Retake>
          Retake
          <input type="file" multiple={false} onChange={setNewImage} />
        </Retake>
      </Buttons>
    </StyledCropperWindow>
  ) : <></>;
};

const StyledCropperWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px 15px 40px;
  width: 100vw;
  height: 100vh;
  background-color: #262626;
  
  .reactEasyCrop_Container {
    top: 182px;
    width: calc(100% + 2px);
    height: 285px;
    background-color: #262626;
  }
  
  .reactEasyCrop_Contain {
    width: auto;
    height: auto;
  }
  
  .reactEasyCrop_CropArea {
    color: #262626;
    width: 285px !important;
    height: 285px !important;
    
    @media (max-width: 300px) {
      width: 250px !important;
      height: 250px !important;
    }
  }
`;

const WindowHeader = styled.div`
  display: flex;
  margin-bottom: 92px;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  span {
    display: block;
    margin-left: -16px;
    font-size: 20px;
    line-height: calc(100% - 2px);
    font-weight: 500;
    color: #fff;
  }
`;

const Close = styled.div`
  height: 17px;
  cursor: pointer;
`;

const Description = styled.p`
  margin-bottom: 40px;
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
`;

const Retake = styled.label`
  padding: 14px 10px;
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50px;
  cursor: pointer;
  
  input {
    display: none;
  }
`;

export default CropperWindow;