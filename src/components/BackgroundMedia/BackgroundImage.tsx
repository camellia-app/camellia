import { useContext, VoidFunctionComponent } from 'react';
import { BackgroundMediaVisibility } from './BackgroundMedia';
import s from './BackgroundMedia.module.css';

interface ImageDimensions {
  height: number;
  width: number;
}

interface BackgroundImageProps {
  dimensions?: ImageDimensions;
  url: string;
}

export const BackgroundImage: VoidFunctionComponent<BackgroundImageProps> = (props) => {
  const context = useContext(BackgroundMediaVisibility);

  const handleImageError = () => {
    console.warn('Failed to load background image, falling back to default background media');

    if (context.loadDefaultBackgroundMedia !== undefined) {
      context.loadDefaultBackgroundMedia();
    }
  };

  const handleImageLoad = () => {
    if (context.makeVisible !== undefined) {
      context.makeVisible();
    }
  };

  return (
    <img
      alt=""
      className={s.backgroundMedia}
      crossOrigin="anonymous"
      decoding="async"
      height={props.dimensions?.height}
      importance="low"
      onError={handleImageError}
      onLoad={handleImageLoad}
      referrerPolicy="no-referrer"
      src={props.url}
      width={props.dimensions?.width}
    />
  );
};
