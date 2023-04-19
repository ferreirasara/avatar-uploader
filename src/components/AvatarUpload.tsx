import '../i18n/config';
import '../style/AvatarUpload.scss';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { ImageContainer } from './ImageContainer';
import { AvatarUploadComponentState, AvatarUploadContainerProps, TAvatarUploadContext } from '../@types/AvatarUpload';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ImageFileIcon } from '../icons/image-file.svg';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { Slider } from './Slider';

const AvatarUploadContext = createContext<TAvatarUploadContext>({});

const AvatarUploadContainer = (props: AvatarUploadContainerProps) => {
  const { children, bordered } = props;
  return <div className={'avatar-uploader-container' + (bordered ? ' bordered' : '')}>
    {children}
  </div>
}

const CloseButton = () => {
  const { handleCancel } = useContext(AvatarUploadContext);

  return <div className='close-button-container'>
    <CloseIcon id='close-icon' onClick={handleCancel} />
  </div>
}

const AvatarUploadInner = () => {
  const { componentState } = useContext(AvatarUploadContext);

  switch (componentState) {
    case 'error':
      return <AvatarUploadError />
    case 'cropping':
      return <AvatarUploadCrop />

    default:
      return <AvatarUploadInitial />;
  }
}

const AvatarUploadError = () => {
  const { handleCancel } = useContext(AvatarUploadContext);
  const { t } = useTranslation();

  return <>
    <ImageContainer />
    <div className='error-text-container'>
      <div className='error-text'>
        {t('errorState.sorry')}
      </div>
      <div
        className="try-again-text"
        onClick={handleCancel}
      >
        {t('errorState.tryAgain')}
      </div>
    </div>
    <CloseButton />
  </>
}

const AvatarUploadCrop = () => {
  const { uploadedFile, handleSaveCroppedImage, handleError } = useContext(AvatarUploadContext);
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
  }, [zoomValue, handleError, uploadedFile])

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

const AvatarUploadInitial = () => {
  const { croppedImage, handleUploadeImage, handleError } = useContext(AvatarUploadContext);
  const { t } = useTranslation();

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    try {
      acceptedFiles?.forEach(file => handleUploadeImage && handleUploadeImage(file));
    } catch (e) {
      console.log(e)
      handleError && handleError();
    }
  }, [handleUploadeImage, handleError])

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
      <div className='initial-text primary'>
        <ImageFileIcon /> {t('initialState.logo')}
      </div>
      <div className='initial-text secondary'>
        {t('initialState.dropImage')}
      </div>
    </div>
  </div>
}

export const AvatarUpload = () => {
  const [componentState, setComponentState] = useState<AvatarUploadComponentState>('initial');
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

  return <AvatarUploadContainer bordered={componentState === 'initial'}>
    <AvatarUploadContext.Provider value={{ componentState, croppedImage, uploadedFile, handleError, handleCancel, handleUploadeImage, handleSaveCroppedImage }}>
      <AvatarUploadInner />
    </AvatarUploadContext.Provider>
  </AvatarUploadContainer>
}