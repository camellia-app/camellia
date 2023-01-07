import type { FC } from 'react';
import { useRandomPhotoFromUnsplashCollection } from '../../../../api/unsplash/hook';
import { ImageByUrl } from './ImageByUrl';

export const PhotoFromUnsplashCollectionById: FC<{
  collection: string;
  onLoad: () => void;
}> = (props) => {
  const photo = useRandomPhotoFromUnsplashCollection(props.collection);

  if (photo === undefined) {
    return <></>;
  }

  return <ImageByUrl dimensions={photo.image.resolution} onLoad={props.onLoad} url={photo.image.url} />;
};
