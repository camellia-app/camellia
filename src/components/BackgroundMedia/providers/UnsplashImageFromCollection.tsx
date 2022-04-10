import { BackgroundImageByUrl } from './BackgroundImageByUrl';
import type { VFC } from 'react';

export const UnsplashImageFromCollection: VFC<{
  collectionId: string;
  onLoad: () => void;
}> = (props) => {
  const pixelRatio = window.devicePixelRatio;

  const realWidth = Math.round(window.screen.width * pixelRatio);
  const realHeight = Math.round(window.screen.height * pixelRatio);

  const dimensions = {
    height: realHeight,
    width: realWidth,
  };

  return (
    <BackgroundImageByUrl
      dimensions={dimensions}
      onLoad={props.onLoad}
      url={`https://source.unsplash.com/collection/${props.collectionId}/${realWidth}x${realHeight}/daily`}
    />
  );
};
