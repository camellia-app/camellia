import { getPlatform } from '../api/appEnvironment';
import { config } from '../config';

export type UpdatedCallback = (previousVersion: string) => void;

export const onAppUpdated = (callback: UpdatedCallback): void => {
  switch (getPlatform()) {
    case 'chromium':
      onChromiumAppUpdated(callback);

      break;

    case 'webext':
      onWebextAppUpdated(callback);

      break;

    case 'web':
      onWebAppUpdated(callback);

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

const onWebAppUpdated = (callback: UpdatedCallback): void => {
  callback(config.appVersion);
};
