import type { GetFavicon } from '../common';

import { config } from '../../../config';

export const getWebsiteIconsProxyFavicon: GetFavicon = (url) => {
  const faviconUrl = new URL(config.websiteIconsProxy.baseHost);

  faviconUrl.pathname = '/favicon';
  faviconUrl.searchParams.append('domain', new URL(url).hostname);

  return faviconUrl.href;
};
