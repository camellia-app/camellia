import { AppPlatform, getPlatform } from '../api/appEnvironment';

export type InstalledCallback = () => void;

export const onAppInstalled = (callback: InstalledCallback): void => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      onChromiumAppInstalled(callback);

      break;

    case AppPlatform.Webext:
      onWebextAppInstalled(callback);

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
