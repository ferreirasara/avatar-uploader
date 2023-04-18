import '../i18n/config';
import '../style/AvatarUploader.scss';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { ImageContainer } from './ImageContainer';
import { AvatarUploaderComponentState, AvatarUploaderContainerProps, TAvatarUploaderContext } from '../@types/AvatarUploader';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ImageFileIcon } from '../icons/image-file.svg';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { Slider } from './Slider';

const AvatarUploaderContext = createContext<TAvatarUploaderContext>({});

const AvatarUploaderContainer = (props: AvatarUploaderContainerProps) => {
  const { children, bordered } = props;
  return <div className={'avatar-uploader-container' + (bordered ? ' bordered' : '')}>
    {children}
  </div>
}

const CloseButton = () => {
  const { handleCancel } = useContext(AvatarUploaderContext);

  return <div className='close-button-container'>
    <CloseIcon id='close-icon' onClick={handleCancel} />
  </div>
}

const AvatarUploaderInner = () => {
  const { componentState } = useContext(AvatarUploaderContext);

  switch (componentState) {
    case 'initial':
      return <AvatarUploaderInitial />
    case 'error':
      return <AvatarUploaderError />
    case 'cropping':
      return <AvatarUploaderCrop />

    default:
      return <AvatarUploaderInitial />;
  }
}

const AvatarUploaderError = () => {
  const { handleCancel } = useContext(AvatarUploaderContext);
  const { t } = useTranslation();

  return <>
    <ImageContainer />
    <div className='error-text-container'>
      <span className='error-text'>{t('errorState.sorry')}</span>
      <br />
      <span className="try-again-text" onClick={handleCancel}>{t('errorState.tryAgain')}</span>
    </div>
    <CloseButton />
  </>
}

const AvatarUploaderCrop = () => {
  const { uploadedFile, handleSaveCroppedImage, handleError } = useContext(AvatarUploaderContext);
  const { t } = useTranslation();
  const [zoomValue, setZoomValue] = useState<number>(50);
  const [localCroppedImage, setLocalCroppedImage] = useState<string>();

  useEffect(() => {
    const img = new Image();
    if (uploadedFile) img.src = URL.createObjectURL(uploadedFile)
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas?.getContext('2d');

      const zoomPerc = zoomValue / 100;
      const cropWidth = img.width * (1 - zoomPerc);
      const cropHeight = img.height * (1 - zoomPerc);
      const x1 = img.width - cropWidth;
      const y1 = img.height - cropHeight;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx?.drawImage(img, x1, y1, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      canvas?.toBlob((blob) => {
        if (blob) setLocalCroppedImage(URL.createObjectURL(blob));
      });
    };
    img.onerror = () => {
      handleError && handleError();
    };
  }, [zoomValue])

  return <>
    <ImageContainer image={localCroppedImage} />
    <div className='crop-container'>
      <span className="crop-text">
        {t('croppingState.crop')}
      </span>
      <Slider value={zoomValue} onChange={(newValue) => setZoomValue(newValue)} />
      <div className='save-crop-button-container'>
        <button className="save-crop-button" onClick={() => handleSaveCroppedImage && localCroppedImage && handleSaveCroppedImage(localCroppedImage)}>
          {t('croppingState.save')}
        </button>
      </div>
    </div>
    <CloseButton />
  </>
}

const AvatarUploaderInitial = () => {
  const { croppedImage, handleUploadeImage, handleError } = useContext(AvatarUploaderContext);
  const { t } = useTranslation();

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    try {
      acceptedFiles?.forEach(file => handleUploadeImage && handleUploadeImage(file));
    } catch (e) {
      console.log(e)
      handleError && handleError();
    }
  }, [handleUploadeImage])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.png'] }
  })

  return <div
    {...getRootProps()}
    className='dropzone-container'
  >
    <input
      {...getInputProps()}
      data-testid={'file-input'}
    />
    {croppedImage ? <ImageContainer image={croppedImage} /> : null}
    <div className='dropzone-text-container'>
      <span className='initial-text primary'>
        <ImageFileIcon /> {t('initialState.logo')}
      </span>
      <br />
      <span className='initial-text secondary'>
        {t('initialState.dropImage')}
      </span>
    </div>
  </div>
}

export const AvatarUploader = () => {
  const [componentState, setComponentState] = useState<AvatarUploaderComponentState>('initial');
  const [croppedImage, setCroppedImage] = useState<string>();
  const [uploadedFile, setUploadedFile] = useState<File>();

  const handleError = () => setComponentState('error');

  const handleCancel = () => {
    setUploadedFile(undefined);
    setComponentState('initial');
  };

  const handleUploadeImage = (file: File) => {
    setUploadedFile(file);
    setCroppedImage(undefined);
    setComponentState('cropping');
  };

  const handleSaveCroppedImage = (imgSrc: string) => {
    setCroppedImage(imgSrc);
    setComponentState('initial');
  }

  return <AvatarUploaderContainer bordered={componentState === 'initial'}>
    <AvatarUploaderContext.Provider value={{ componentState, croppedImage, uploadedFile, handleError, handleCancel, handleUploadeImage, handleSaveCroppedImage }}>
      <AvatarUploaderInner />
    </AvatarUploaderContext.Provider>
  </AvatarUploaderContainer>
}