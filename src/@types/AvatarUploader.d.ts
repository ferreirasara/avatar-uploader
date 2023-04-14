export type AvatarUploaderComponentState = 'initial' | 'error' | 'cropping';

export type AvatarUploaderContainerProps = {
  children: React.ReactNode,
  bordered?: boolean
}

export type AvatarUploaderInnerProps = {
  componentState: AvatarUploaderComponentState
  uploadedImage: string
  onUploadImage: (uploadedImage: string) => void
  onSaveCropping: () => void
  onCancelCropping: () => void
}

export type AvatarUploaderInitialProps = {
  uploadedImage: string
  onUploadImage: (uploadedImage: string) => void
}

export type AvatarUploaderErrorProps = {

}

export type AvatarUploaderCropProps = {
  uploadedImage: string
  onSaveCropping: () => void
  onCancelCropping: () => void
}