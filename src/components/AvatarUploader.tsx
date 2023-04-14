import '../i18n/config';
import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { ImageContainer } from './ImageContainer';
import { AvatarUploaderContainerProps, AvatarUploaderInitialProps, AvatarUploaderInnerProps, AvatarUploaderComponentState, AvatarUploaderCropProps, AvatarUploaderErrorProps, CloseButtonProps } from '../@types/AvatarUploader';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ImageFileIcon } from '../icons/image-file.svg';
import { ReactComponent as CloseIcon } from '../icons/close.svg';

const AvatarUploaderContainer = (props: AvatarUploaderContainerProps) => {
  const { children, bordered } = props;
  return <div className={'avatar-uploader-container' + (bordered ? ' bordered' : '')}>
    {children}
  </div>
}

const CloseButton = (props: CloseButtonProps) => {
  const { onClick } = props;
  return <div className='close-button-container'>
    <CloseIcon onClick={onClick} />
  </div>
}

const AvatarUploaderInner = (props: AvatarUploaderInnerProps) => {
  const { componentState, uploadedImage, onUploadImage, onCancel, onSaveCropping } = props;

  switch (componentState) {
    case 'initial':
      return <AvatarUploaderInitial
        onUploadImage={onUploadImage}
        uploadedImage={uploadedImage}
      />
    case 'error':
      return <AvatarUploaderError
        onCancel={onCancel}
      />
    case 'cropping':
      return <AvatarUploaderCrop
        uploadedImage={uploadedImage}
        onCancel={onCancel}
        onSaveCropping={onSaveCropping}
      />

    default:
      return <AvatarUploaderInitial
        onUploadImage={onUploadImage}
        uploadedImage={uploadedImage}
      />;
  }
}

const AvatarUploaderError = (props: AvatarUploaderErrorProps) => {
  const { onCancel } = props;
  const { t } = useTranslation();

  return <>
    <ImageContainer />
    <div className='error-text-container'>
      <span className='error-text'>{t('errorState.sorry')}</span>
      <br />
      <span className="try-again-text">{t('errorState.tryAgain')}</span>
    </div>
    <CloseButton onClick={onCancel} />
  </>
}

const AvatarUploaderCrop = (props: AvatarUploaderCropProps) => {
  const { uploadedImage, onCancel, onSaveCropping } = props;
  const { t } = useTranslation();

  return <>
    <ImageContainer image={uploadedImage} />
    <div>
      <span className="crop-text">
        {t('croppingState.crop')}
      </span>
      <button className="save-crop-button">
        {t('croppingState.save')}
      </button>
    </div>
    <CloseButton onClick={onCancel} />
  </>
}

const AvatarUploaderInitial = (props: AvatarUploaderInitialProps) => {
  const { uploadedImage, onUploadImage } = props;
  const { t } = useTranslation();

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    acceptedFiles?.map(file => onUploadImage(URL.createObjectURL(file)));
  }, [])

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

  return <AvatarUploaderContainer bordered={componentState === 'initial'}>
    <AvatarUploaderInner
      componentState={componentState}
      onUploadImage={(uploadedImage) => {
        setComponentState('cropping')
        setUploadedImage(uploadedImage)
      }}
      onSaveCropping={() => setComponentState('initial')}
      onCancel={() => setComponentState('initial')}
      uploadedImage={uploadedImage}
    />
  </AvatarUploaderContainer>
}