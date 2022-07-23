import type { AppEnvironment } from './common';
import { getChromiumAppEnvironment } from './platform/chromium';
import { getWebAppEnvironment } from './platform/web';
import { getWebextAppEnvironment } from './platform/webext';

export const getAppEnvironment = (): Promise<AppEnvironment> => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumAppEnvironment();

    case AppPlatform.Webext:
      return getWebextAppEnvironment();

    case AppPlatform.Web:
      return getWebAppEnvironment();
  }
};

export enum AppPlatform {
  Chromium = 'chromium',
  Web = 'web',
  Webext = 'webext',
}

export const getPlatform = (): AppPlatform => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
      return AppPlatform.Chromium;

    case 'webext':
      return AppPlatform.Webext;

    case 'web':
      return AppPlatform.Web;

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
  }
};
