import { AppPlatform, getPlatform } from '../appEnvironment';
import type { GetFavicon } from './common';
import { getChromiumFavicon } from './implementation/chromium';
import { getWebsiteIconsProxyFavicon } from './implementation/websiteIconsProxy';

export const getFavicon: GetFavicon = (url, size) => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumFavicon(url, size);

    default:
      return getWebsiteIconsProxyFavicon(url, size);
  }
};