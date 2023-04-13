import '../i18n/config';
import { useState } from "react";
import { AvatarUploaderContainerProps, AvatarUploaderState } from "../@types/AvatarUploader";
import { ImageContainer } from './ImageContainer';

const AvatarUploaderContainer = (props: AvatarUploaderContainerProps) => {
  const { children, bordered } = props;
  return <div className={'avatar-uploader-container' + (bordered ? ' bordered' : '')}>
    {children}
  </div>
}

export const AvatarUploader = () => {
  const [componentState, setComponentState] = useState<AvatarUploaderState>('initial');

  return <AvatarUploaderContainer bordered={componentState === 'initial'}>
    <></>
  </AvatarUploaderContainer>
}