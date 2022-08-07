import type { GetFavicon } from '../common';

export const getChromiumFavicon: GetFavicon = (url, size) => {
  const faviconUrl = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);

  faviconUrl.searchParams.append('pageUrl', url);
  faviconUrl.searchParams.append('size', size.toString());

  return faviconUrl.href;
};
