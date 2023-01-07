import { getPlatform } from '../appEnvironment';
import type { AppInfo } from './common';
import { getChromiumAppInfo } from './platform/chromium';
import { getWebAppInfo } from './platform/web';
import { getWebextAppInfo } from './platform/webext';

export const getAppInfo = (): AppInfo => {
  switch (getPlatform()) {
    case 'chromium':
      return getChromiumAppInfo();

    case 'webext':
      return getWebextAppInfo();

    case 'web':
      return getWebAppInfo();
  }
};
