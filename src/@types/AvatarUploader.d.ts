export type AvatarUploaderState = 'initial' | 'error' | 'cropping';

export type AvatarUploaderContainerProps = {
  children: React.ReactNode,
  bordered?: boolean
}

export type AvatarUploaderInitialProps = {
  img?: string
}

export type AvatarUploaderCropProps = {
  img?: string
}

export type AvatarUploaderInnerProps = {
  componentState: AvatarUploaderState
  uploadedImage?: string
}