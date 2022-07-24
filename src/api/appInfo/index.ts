import { AppPlatform, getPlatform } from '../appEnvironment';
import type { AppInfo } from './common';
import { getChromiumAppInfo } from './platform/chromium';
import { getWebAppInfo } from './platform/web';
import { getWebextAppInfo } from './platform/webext';

export const getAppInfo = (): AppInfo => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumAppInfo();

    case AppPlatform.Webext:
      return getWebextAppInfo();

    case AppPlatform.Web:
      return getWebAppInfo();
  }
};
