import { config } from '../../config';
import { getAppInfo } from '../appInfo';
import type { UnsplashPhoto } from './common';

export const getRandomUnsplashPhotoFromCollection = async (
  collectionId: string,
  abortSignal?: AbortSignal,
): Promise<UnsplashPhoto> => {
  const requestUrl = new URL(config.unsplash.bridge.baseHost);
  requestUrl.pathname = '/random-collection-entry';
  requestUrl.searchParams.set('id', collectionId);

  const response = await fetch(requestUrl.toString(), {
    signal: abortSignal ?? null,
  });

  const photo: UnsplashPhoto = await response.json();

  const webPageUrl = new URL(photo.webPageUrl);

  // These UTM parameters are required by Unsplash API Guidelines: https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
  webPageUrl.searchParams.set('utm_source', getAppInfo().name);
  webPageUrl.searchParams.set('utm_medium', 'referral');

  photo.webPageUrl = webPageUrl.toString();

  return photo;
};
