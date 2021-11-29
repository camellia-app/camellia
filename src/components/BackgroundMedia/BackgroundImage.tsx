import type { VoidFunctionComponent } from 'react';
import { useContext } from 'react';
import { BackgroundMediaVisibility } from './BackgroundMedia';
import s from './BackgroundMedia.module.css';

type ImageDimensions = {
  height: number;
  width: number;
};

type BackgroundImageProps = {
  dimensions?: ImageDimensions;
  url: string;
};

export const BackgroundImage: VoidFunctionComponent<BackgroundImageProps> = (props) => {
  const context = useContext(BackgroundMediaVisibility);

  const handleImageError = (): void => {
    console.warn('Failed to load background image, falling back to default background media');

    if (context.loadDefaultBackgroundMedia !== undefined) {
      context.loadDefaultBackgroundMedia();
    }
  };

  const handleImageLoad = (): void => {
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
