import { AppPlatform, getPlatform } from '../api/appEnvironment';

export type UpdatedCallback = (previousVersion: string) => void;

export const onAppUpdated = (callback: UpdatedCallback): void => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      onChromiumAppUpdated(callback);

      break;

    case AppPlatform.Webext:
      onWebextAppUpdated(callback);

      break;
  }
};

const onChromiumAppUpdated = (callback: UpdatedCallback): void => {
  chrome.runtime.onInstalled.addListener((event) => {
    if (event.reason !== 'update' || event.previousVersion === undefined) {
      return;
    }

    callback(event.previousVersion);
  });
};

const onWebextAppUpdated = (callback: UpdatedCallback): void => {
  browser.runtime.onInstalled.addListener((event) => {
    if (event.reason !== 'update' || event.previousVersion === undefined) {
      return;
    }

    callback(event.previousVersion);
  });
};
