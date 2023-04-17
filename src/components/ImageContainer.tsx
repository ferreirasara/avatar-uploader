import { ImageContainerProps } from "../@types/ImageContainer";
import { ReactComponent as InfoIcon } from '../icons/info.svg';

const ImagePlaceholder = () => {
  return <div className="image-container placeholder">
    <InfoIcon />
  </div>
}

export const ImageContainer = (props: ImageContainerProps) => {
  const { image } = props;
  return <div className="image-container">
    {image ? <img src={image} className="image-container img" />
      : <ImagePlaceholder />
    }
  </div>
}