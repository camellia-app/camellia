import type { FC, ReactEventHandler } from 'react';

import { backgroundImageByUrl } from './ImageByUrl.module.css';

type ImageDimensions = {
  height: number;
  width: number;
};

export const ImageByUrl: FC<{
  dimensions?: ImageDimensions;
  onLoad: () => void;
  url: string;
}> = (props) => {
  const handleImageError: ReactEventHandler<HTMLImageElement> = (): void => {
    console.warn('Failed to load background image');
  };

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (): void => {
    props.onLoad();
  };

  return (
    <img
      alt=""
      className={backgroundImageByUrl}
      height={props.dimensions?.height}
      onError={handleImageError}
      onLoad={handleImageLoad}
      referrerPolicy="no-referrer"
      src={props.url}
      width={props.dimensions?.width}
    />
  );
};
