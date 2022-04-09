import { getChromiumAppEnvironment } from './platform/chromium';
import { getWebextAppEnvironment } from './platform/webext';
import type { AppEnvironment } from './common';

export const getAppEnvironment = (): Promise<AppEnvironment> => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumAppEnvironment();

    case AppPlatform.Webext:
      return getWebextAppEnvironment();
  }
};

export enum AppPlatform {
  Chromium = 'chromium',
  Webext = 'webext',
}

export const getPlatform = (): AppPlatform => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
      return AppPlatform.Chromium;

    case 'webext':
      return AppPlatform.Webext;

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
  }
};
