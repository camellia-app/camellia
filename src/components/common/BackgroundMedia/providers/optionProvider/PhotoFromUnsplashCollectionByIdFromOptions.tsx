import type { FC } from 'react';

import { useOption } from '../../../../../api/options/hook';
import { PhotoFromUnsplashCollectionById } from '../PhotoFromUnsplashCollectionById';

export const PhotoFromUnsplashCollectionByIdFromOptions: FC<{
  onLoad: () => void;
}> = (props) => {
  const [backgroundImageUnsplashCollection] = useOption('background_image_unsplash_collection');

  if (backgroundImageUnsplashCollection === undefined) {
    return <></>;
  }

  return <PhotoFromUnsplashCollectionById collection={backgroundImageUnsplashCollection} onLoad={props.onLoad} />;
};
