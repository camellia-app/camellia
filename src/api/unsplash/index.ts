import type { UnsplashPhoto } from './common';

import { config } from '../../config';
import { getAppInfo } from '../appInfo';

type ApiProblem = {
  type: 'collection_not_found';
};

export class UnsplashError extends Error {}

export class CollectionDoesNotExist extends UnsplashError {
  constructor(public readonly collectionId: string) {
    super(`Unsplash collection with ID "${collectionId}" does not exist`);
  }
}

export const getRandomUnsplashPhotoFromCollectionByUrl = (
  collectionUrl: string,
  abortSignal?: AbortSignal | undefined,
): Promise<UnsplashPhoto> => {
  const collectionId = collectionUrl.replace(/^https:\/\/unsplash\.com\/collections\/([0-9]+).*/, '$1');

  return getRandomUnsplashPhotoFromCollectionById(collectionId, abortSignal);
};

export const getRandomUnsplashPhotoFromCollectionById = async (
  collectionId: string,
  abortSignal?: AbortSignal | undefined,
): Promise<UnsplashPhoto> => {
  const requestUrl = new URL(config.unsplash.bridge.baseHost);
  requestUrl.pathname = '/random-collection-entry';
  requestUrl.searchParams.set('id', collectionId);

  const response = await fetch(requestUrl.toString(), {
    signal: abortSignal ?? null,
  });

  const photo: ApiProblem | UnsplashPhoto = await response.json();

  if ('type' in photo) {
    switch (photo.type) {
      case 'collection_not_found':
        throw new CollectionDoesNotExist(collectionId);

      default:
        throw new UnsplashError(`Unknown Unsplash API error: ${photo.type}`);
    }
  }

  const webPageUrl = new URL(photo.photographer.url);

  // These UTM parameters are required by Unsplash API Guidelines: https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
  webPageUrl.searchParams.set('utm_source', getAppInfo().name);
  webPageUrl.searchParams.set('utm_medium', 'referral');

  photo.webPageUrl = webPageUrl.toString();

  return photo;
};
