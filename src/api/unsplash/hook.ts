import { getActiveTransaction } from '@sentry/tracing';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { UnsplashState } from '../../store/slice/unsplashSlice';
import { unsplashSlice } from '../../store/slice/unsplashSlice';
import type { UnsplashPhoto } from './common';
import { CollectionDoesNotExist, getRandomUnsplashPhotoFromCollectionByUrl } from './index';

export const useRandomPhotoFromUnsplashCollection = (collectionUrl: string): UnsplashPhoto | undefined => {
  const unsplashPhotoState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  const dispatch = useDispatch();

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useRandomPhotoFromUnsplashCollection',
    });

    const abortController = new AbortController();

    getRandomUnsplashPhotoFromCollectionByUrl(collectionUrl, abortController.signal)
      .then((photo) => {
        span?.setStatus('ok');

        dispatch(unsplashSlice.actions.updatePhoto(photo));
      })
      .catch((error: unknown) => {
        // we don't want to see AbortError in Sentry and in logs
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        if (error instanceof CollectionDoesNotExist) {
          console.warn(error.message);

          return;
        }

        throw error;
      })
      .finally(() => {
        span?.finish();
      });

    return () => {
      abortController.abort();
    };
  }, [collectionUrl, dispatch]);

  return unsplashPhotoState.photo;
};

export const useUnsplashAttributions = (): UnsplashPhoto | undefined => {
  const unsplashPhotoState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  return unsplashPhotoState.photo;
};
