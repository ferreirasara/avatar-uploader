import '../i18n/config';
import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { ImageContainer } from './ImageContainer';
import { AvatarUploaderContainerProps, AvatarUploaderInitialProps, AvatarUploaderInnerProps, AvatarUploaderComponentState, AvatarUploaderCropProps, AvatarUploaderErrorProps } from '../@types/AvatarUploader';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ImageFileIcon } from '../icons/image-file.svg';
import { ReactComponent as CloseIcon } from '../icons/close.svg';

const AvatarUploaderContainer = (props: AvatarUploaderContainerProps) => {
  const { children, bordered } = props;
  return <div className={'avatar-uploader-container' + (bordered ? ' bordered' : '')}>
    {children}
  </div>
}

const AvatarUploaderInner = (props: AvatarUploaderInnerProps) => {
  const { componentState, uploadedImage, onUploadImage, onCancelCropping, onSaveCropping } = props;

  switch (componentState) {
    case 'initial':
      return <AvatarUploaderInitial
        onUploadImage={onUploadImage}
        uploadedImage={uploadedImage}
      />
    case 'error':
      return <AvatarUploaderError />
    case 'cropping':
      return <AvatarUploaderCrop
        uploadedImage={uploadedImage}
        onCancelCropping={onCancelCropping}
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
  const { t } = useTranslation();

  return <>
    <ImageContainer />
    <div>
      <span className='error-text'>{t('errorState.sorry')}</span>
      <br />
      <span className="try-again-text">{t('errorState.tryAgain')}</span>
    </div>
    <CloseIcon />
  </>
}

const AvatarUploaderCrop = (props: AvatarUploaderCropProps) => {
  const { uploadedImage, onCancelCropping, onSaveCropping } = props;
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
    <CloseIcon onClick={onCancelCropping} />
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
    <div>
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
      onCancelCropping={() => setComponentState('initial')}
      uploadedImage={uploadedImage}
    />
  </AvatarUploaderContainer>
}