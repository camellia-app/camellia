import type { FC } from 'react';
import { useRandomPhotoFromUnsplashCollection } from '../../../api/unsplash/hook';
import { BackgroundImageByUrl } from './BackgroundImageByUrl';

export const UnsplashImageFromCollection: FC<{
  onLoad: () => void;
}> = (props) => {
  const photo = useRandomPhotoFromUnsplashCollection();

  if (photo === undefined) {
    return <></>;
  }

  return <BackgroundImageByUrl dimensions={photo.image.resolution} onLoad={props.onLoad} url={photo.image.url} />;
};
