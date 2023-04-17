export type AvatarUploaderComponentState = 'initial' | 'error' | 'cropping';

export type AvatarUploaderContainerProps = {
  children: React.ReactNode,
  bordered?: boolean
}

export type TAvatarUploaderContext = {
  componentState?: AvatarUploaderComponentState
  croppedImage?: string
  uploadedFile?: File
  handleCancel?: () => void
  handleUploadeImage?: (file: File) => void
  handleSaveCroppedImage?: (imgSrc: string) => void
}