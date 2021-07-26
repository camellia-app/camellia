import { useContext } from 'react';
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

export const BackgroundImage = (props: BackgroundImageProps) => {
  const context = useContext(BackgroundMediaVisibility);

  const handleImageError = () => {
    console.warn('Failed to load background image, falling back to default background media');

    context.loadDefaultBackgroundMedia();
  };

  const handleImageLoad = () => {
    context.makeVisible();
  };

  return <img alt="" className={s.backgroundMedia} crossOrigin="anonymous" decoding="async" height={props.dimensions?.height} importance="low" onError={handleImageError} onLoad={handleImageLoad} referrerPolicy="no-referrer" src={props.url} width={props.dimensions?.width} />;
};
