import { useEffect, useState } from 'react';
import type { UnsplashPhoto } from './common';
import { getRandomUnsplashPhotoFromCollection } from './index';

export const useRandomPhotoFromUnsplashCollection = (collectionId: string): UnsplashPhoto | undefined => {
  const [photo, setPhoto] = useState<UnsplashPhoto | undefined>(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    getRandomUnsplashPhotoFromCollection(collectionId, abortController.signal).then((photo) => {
      setPhoto(photo);
    });

    return () => {
      abortController.abort();
    };
  }, [collectionId]);

  return photo;
};
