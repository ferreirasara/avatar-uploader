export type AvatarUploadComponentState = 'initial' | 'error' | 'cropping';

export type AvatarUploadContainerProps = {
  children: React.ReactNode,
  bordered?: boolean
}

export type TAvatarUploadContext = {
  componentState?: AvatarUploadComponentState
  croppedImage?: string
  uploadedFile?: File
  handleError?: () => void
  handleCancel?: () => void
  handleUploadeImage?: (file: File) => void
  handleSaveCroppedImage?: (imgSrc: string) => void
}