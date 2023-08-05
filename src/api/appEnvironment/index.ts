import type { AppEnvironment } from './common';

import { getChromiumAppEnvironment } from './platform/chromium';
import { getWebAppEnvironment } from './platform/web';
import { getWebextAppEnvironment } from './platform/webext';

export const getAppEnvironment = (): Promise<AppEnvironment> => {
  switch (getPlatform()) {
    case 'chromium':
      return getChromiumAppEnvironment();

    case 'webext':
      return getWebextAppEnvironment();

    case 'web':
      return getWebAppEnvironment();
  }
};

export type AppPlatform = 'chromium' | 'web' | 'webext';

export const getPlatform = (): AppPlatform => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
    case 'webext':
    case 'web':
      return process.env['TARGET_PLATFORM'];

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
  }
};

export const isMacOs = (): boolean => {
  return navigator.userAgent.indexOf('Mac') !== -1;
};
