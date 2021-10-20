import { BackgroundImage } from './BackgroundImage';
import { VoidFunctionComponent } from 'react';

export const RandomUnsplashImage: VoidFunctionComponent = () => {
  const pixelRatio = window.devicePixelRatio;

  const realWidth = Math.round(window.screen.width * pixelRatio);
  const realHeight = Math.round(window.screen.height * pixelRatio);

  const dimensions = {
    height: realHeight,
    width: realWidth,
  };

  return (
    <BackgroundImage
      dimensions={dimensions}
      url={`https://source.unsplash.com/collection/${process.env['UNSPLASH_COLLECTION_ID']}/${realWidth}x${realHeight}/daily`}
    />
  );
};
