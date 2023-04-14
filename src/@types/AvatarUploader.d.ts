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
  onCancel: () => void
}

export type AvatarUploaderInitialProps = {
  uploadedImage: string
  onUploadImage: (uploadedImage: string) => void
}

export type AvatarUploaderErrorProps = {
  onCancel: () => void
}

export type AvatarUploaderCropProps = {
  uploadedImage: string
  onSaveCropping: () => void
  onCancel: () => void
}

export type CloseButtonProps = {
  onClick: () => void
}