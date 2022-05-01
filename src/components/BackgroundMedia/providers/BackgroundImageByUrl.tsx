import type { ReactEventHandler, VFC } from 'react';
import s from './BackgroundImageByUrl.module.css';
import { calculateImageBrightness } from '../../../api/imageBrightnessDetector/canvas';
import { useContext } from 'react';
import { BackgroundMediaBrightnessContext } from '../BackgroundMediaBrightnessContext';

type ImageDimensions = {
  height: number;
  width: number;
};

export const BackgroundImageByUrl: VFC<{
  dimensions?: ImageDimensions;
  onLoad: () => void;
  url: string;
}> = (props) => {
  const brightnessContext = useContext(BackgroundMediaBrightnessContext);

  const handleImageError: ReactEventHandler<HTMLImageElement> = (): void => {
    console.warn('Failed to load background image, falling back to default background media');
  };

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = async (event): Promise<void> => {
    brightnessContext.setBrightness(await calculateImageBrightness(event.currentTarget));

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
