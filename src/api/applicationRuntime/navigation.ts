import { getPlatform } from '../appEnvironment';

export const openOptionsPage = (): void => {
  switch (getPlatform()) {
    case 'chromium':
      chrome.runtime.openOptionsPage();

      break;

    case 'webext':
      browser.runtime.openOptionsPage();

      break;

    case 'web':
      openUrl('options.html');

      break;
  }
};

export const openBookmarkManager = (): void => {
  switch (getPlatform()) {
    case 'chromium':
      openUrl('chrome://bookmarks/');

      break;

    case 'webext':
      throw new Error('Bookmark manager is not supported by webext platform');

    case 'web':
      throw new Error('Bookmark manager is not supported by web platform');
  }
};

export const openUrl = (url: string): void => {
  switch (getPlatform()) {
    case 'chromium':
      chrome.tabs.create({
        url: url,
      });

      break;

    case 'webext':
      browser.tabs.create({
        url: url,
      });

      break;

    case 'web':
      open(url, '_self');

      break;
  }
};
