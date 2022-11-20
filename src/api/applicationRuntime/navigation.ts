import { AppPlatform, getPlatform } from '../appEnvironment';

export const openOptionsPage = (): void => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      chrome.runtime.openOptionsPage();

      break;

    case AppPlatform.Webext:
      browser.runtime.openOptionsPage();

      break;

    case AppPlatform.Web:
      open('options.html');

      break;
  }
};

export const openBookmarkManager = (): void => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      chrome.tabs.create({
        url: 'chrome://bookmarks/',
      });

      break;

    case AppPlatform.Webext:
      throw new Error('Bookmark manager is not supported by webext platform');

    case AppPlatform.Web:
      throw new Error('Bookmark manager is not supported by web platform');
  }
};
