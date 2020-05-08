import { h } from 'preact';
import { useContext } from 'preact/hooks';
import * as s from './BackgroundMedia.css';
import { BackgroundMediaVisibility } from './BackgroundMedia';

declare module 'preact' {
  namespace h {
    namespace JSX {
      interface HTMLAttributes {
        decoding?: string;
        importance?: string;
        referrerpolicy?: string;
      }
    }
  }
}

export interface ImageDimensions {
  height: number;
  width: number;
}

interface BackgroundImageProps {
  url: string;
  dimensions?: ImageDimensions;
}

export default (props: BackgroundImageProps) => {
  const context = useContext(BackgroundMediaVisibility);

  const handleImageError = () => {
    console.warn('Failed to load background image, falling back to default background media');

    context.loadDefaultBackgroundMedia();
  };

  const handleImageLoad = () => {
    context.makeVisible();
  };

  return <img className={s.backgroundMedia} src={props.url} alt="" onLoad={handleImageLoad} onError={handleImageError} height={props.dimensions?.height} width={props.dimensions?.width} crossOrigin="anonymous" referrerpolicy="no-referrer" importance="low" decoding="async" />;
};
