import type { FC } from 'react';
import { useRandomPhotoFromUnsplashCollection } from '../../../api/unsplash/hook';
import { ImageByUrl } from './ImageByUrl';

export const PhotoFromUnsplashCollectionById: FC<{
  collectionId: string;
  onLoad: () => void;
}> = (props) => {
  console.count('Rerender <PhotoFromUnsplashCollectionById>');
  console.log(props);

  const photo = useRandomPhotoFromUnsplashCollection(props.collectionId);

  if (photo === undefined) {
    return <></>;
  }

  return <ImageByUrl dimensions={photo.image.resolution} onLoad={props.onLoad} url={photo.image.url} />;
};
