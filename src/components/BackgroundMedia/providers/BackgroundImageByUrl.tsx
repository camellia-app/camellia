import type { ReactEventHandler, FC } from 'react';
import { backgroundImageByUrl } from './BackgroundImageByUrl.module.css';

type ImageDimensions = {
  height: number;
  width: number;
};

export const BackgroundImageByUrl: FC<{
  dimensions?: ImageDimensions;
  onLoad: () => void;
  url: string;
}> = (props) => {
  const handleImageError: ReactEventHandler<HTMLImageElement> = (): void => {
    console.warn('Failed to load background image, falling back to default background media');
  };

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (): void => {
    props.onLoad();
  };

  return (
    <img
      alt=""
      className={backgroundImageByUrl}
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
