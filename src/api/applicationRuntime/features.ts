import { AppPlatform, getPlatform } from '../appEnvironment';

type RuntimeFeatures = {
  bookmarkManagerPage: boolean;
};

export const getSupportedRuntimeFeatures = (): RuntimeFeatures => {
  return {
    bookmarkManagerPage: getPlatform() === AppPlatform.Chromium,
  };
};
