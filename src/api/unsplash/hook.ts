import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { UnsplashState } from '../../store/slice/unsplashSlice';
import type { UnsplashPhoto } from './common';

export const useRandomPhotoFromUnsplashCollection = (): UnsplashPhoto | undefined => {
  const unsplashPhotographerAttributionsState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  return unsplashPhotographerAttributionsState.photo;
};
