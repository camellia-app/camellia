import { getPlatform } from '../api/appEnvironment';

export type InstalledCallback = () => void;

export const onAppInstalled = (callback: InstalledCallback): void => {
  switch (getPlatform()) {
    case 'chromium':
      onChromiumAppInstalled(callback);

      break;

    case 'webext':
      onWebextAppInstalled(callback);

      break;

    case 'web':
      onWebAppInstalled(callback);

      break;
  }
};

const onChromiumAppInstalled = (callback: InstalledCallback): void => {
  chrome.runtime.onInstalled.addListener((event) => {
    if (event.reason !== 'install') {
      return;
    }

    callback();
  });
};

const onWebextAppInstalled = (callback: InstalledCallback): void => {
  browser.runtime.onInstalled.addListener((event) => {
    if (event.reason !== 'install') {
      return;
    }

    callback();
  });
};

const onWebAppInstalled = (callback: InstalledCallback): void => {
  callback();
};
