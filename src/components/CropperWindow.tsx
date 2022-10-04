import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Cropper, { Area } from 'react-easy-crop';
import useToggle, { HandleToggle } from '@/hooks/useToggle';
import CloseIcon from '@/icons/CloseIcon';
import getCroppedImg from '@/utils/getCroppedImage';
import { useDispatch } from 'react-redux';
import { uploadSelfieAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import useModalWindow from '@/hooks/useModalWindow';
import heicConverter from '@/utils/heicConverter';

interface Props {
  hide: HandleToggle,
  filePath: string,
  withoutRouting?: boolean
}

const CropperWindow: React.FC<Props> = ({ filePath, hide, withoutRouting = false }) => {
  const [isLoading, toggleIsLoading] = useToggle();
  const [path, setPath] = useState(filePath);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const dispatch = useDispatch();

  useModalWindow();

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = useCallback(async () => {
    try {
      toggleIsLoading(true);
      const croppedImage = await getCroppedImg(
        path,
        croppedAreaPixels
      );

      dispatch(uploadSelfieAction(croppedImage, withoutRouting ? hide : undefined));
    } catch (e) {
      toggleIsLoading(false);
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const setNewImage = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];
      let url;

      if (file.name.endsWith('.heic')) {
        heicConverter(file).then(result => {
          setPath(result);
        });
      } else {
        url = URL.createObjectURL(file);
        setPath(url);
      }
    } else {
      setPath(filePath);
      console.log(evt.target);
    }
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
          aspect={1}
          crop={crop}
          onCropChange={setCrop}
          zoom={zoom}
          onZoomChange={setZoom}
          minZoom={minZoom}
          cropShape="round"
          showGrid={false}
          onCropComplete={cropComplete}
          cropSize={{ width: 285, height: 285 }}
          onMediaLoaded={({ width, height }) => {
            const smallerSide = width > height ? height : width;

            setZoom(285 / smallerSide);
            setMinZoom(285 / smallerSide);
          }}
        />
      </div>
      <Buttons>
        <Retake>
          Retake
          <input type="file" multiple={false} onChange={setNewImage} />
        </Retake>
        <Save onClick={createCroppedImage}>
          {isLoading ? <Loader /> : 'Save'}
        </Save>
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
    
    @media (min-width: 768px) {
      width: calc(100% - 2px);
    }
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

  @media (min-width: 768px) {
    width: 420px;
    height: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const Save = styled.button`
  padding: 14px 10px;
  width: 100%;
  height: 50px;
  font-size: 20px;
  color: #262626;
  font-weight: 500;
  text-align: center;
  border: none;
  background-color: #fff;
  border-radius: 50px;
`;

export default CropperWindow;
