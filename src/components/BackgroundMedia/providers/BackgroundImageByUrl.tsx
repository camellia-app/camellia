import type { VFC } from 'react';
import s from './BackgroundImageByUrl.module.css';

type ImageDimensions = {
  height: number;
  width: number;
};

type BackgroundImageProps = {
  dimensions?: ImageDimensions;
  onLoad: () => void;
  url: string;
};

export const BackgroundImageByUrl: VFC<BackgroundImageProps> = (props) => {
  const handleImageError = (): void => {
    console.warn('Failed to load background image, falling back to default background media');
  };

  const handleImageLoad = (): void => {
    props.onLoad();
  };

  return (
    <img
      alt=""
      className={s.backgroundImageByUrl}
      crossOrigin="anonymous"
      decoding="async"
      height={props.dimensions?.height}
      onError={handleImageError}
      onLoad={handleImageLoad}
      referrerPolicy="no-referrer"
      src={props.url}
      width={props.dimensions?.width}
    />
  );
};
