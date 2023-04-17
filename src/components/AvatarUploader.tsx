import '../i18n/config';
import { createContext, useCallback, useContext, useState } from "react";
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
    <CloseIcon onClick={handleCancel} />
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
  const { t } = useTranslation();

  return <>
    <ImageContainer />
    <div className='error-text-container'>
      <span className='error-text'>{t('errorState.sorry')}</span>
      <br />
      <span className="try-again-text">{t('errorState.tryAgain')}</span>
    </div>
    <CloseButton />
  </>
}

const AvatarUploaderCrop = () => {
  const { uploadedImage } = useContext(AvatarUploaderContext);
  const { t } = useTranslation();
  const [zoomValue, setZoomValue] = useState<number>(50);



  return <>
    <ImageContainer image={uploadedImage} />
    <div className='crop-container'>
      <span className="crop-text">
        {t('croppingState.crop')}
      </span>
      <Slider value={zoomValue} onChange={(newValue) => setZoomValue(newValue)} />
      <div className='save-crop-button-container'>
        <button className="save-crop-button">
          {t('croppingState.save')}
        </button>
      </div>
    </div>
    <CloseButton />
  </>
}

const AvatarUploaderInitial = () => {
  const { uploadedImage, handleUploadeImage } = useContext(AvatarUploaderContext);
  const { t } = useTranslation();

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    acceptedFiles?.forEach(file => handleUploadeImage && handleUploadeImage(file));
  }, [handleUploadeImage])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg', '.png'] }
  })

  return <div
    {...getRootProps()}
    className='dropzone-container'
  >
    <input {...getInputProps()} />
    {uploadedImage ? <ImageContainer image={uploadedImage} /> : null}
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
  const [uploadedImage, setUploadedImage] = useState<string>('');

  const handleCancel = () => setComponentState('initial');

  const handleUploadeImage = (file: File) => {
    setUploadedImage(URL.createObjectURL(file));
    setComponentState('cropping');
  };

  return <AvatarUploaderContainer bordered={componentState === 'initial'}>
    <AvatarUploaderContext.Provider value={{ componentState, uploadedImage, handleCancel, handleUploadeImage }}>
      <AvatarUploaderInner />
    </AvatarUploaderContext.Provider>
  </AvatarUploaderContainer>
}