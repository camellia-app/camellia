export type UpdatedCallback = (previousVersion: string) => void;

export const onAppUpdated = (callback: UpdatedCallback): void => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
      onChromiumAppUpdated(callback);

      break;

    case 'webext':
      onWebextAppUpdated(callback);

      break;

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
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
