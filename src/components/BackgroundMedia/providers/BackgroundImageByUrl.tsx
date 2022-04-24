import type { ReactEventHandler, VFC } from 'react';
import s from './BackgroundImageByUrl.module.css';

type ImageDimensions = {
  height: number;
  width: number;
};

export const BackgroundImageByUrl: VFC<{
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
