export type AvatarUploaderComponentState = 'initial' | 'error' | 'cropping';

export type AvatarUploaderContainerProps = {
  children: React.ReactNode,
  bordered?: boolean
}

export type TAvatarUploaderContext = {
  componentState?: AvatarUploaderComponentState
  uploadedImage?: string
  handleCancel?: () => void
  handleUploadeImage?: (file: File) => void
}