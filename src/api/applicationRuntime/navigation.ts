import { AppPlatform, getPlatform } from '../appEnvironment';

export const openOptionsPage = (): void => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      chrome.runtime.openOptionsPage();

      break;

    case AppPlatform.Webext:
      browser.runtime.openOptionsPage();

      break;
  }
};
