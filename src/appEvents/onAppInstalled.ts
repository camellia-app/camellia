export type InstalledCallback = () => void;

export const onAppInstalled = (callback: InstalledCallback): void => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
      onChromiumAppInstalled(callback);

      break;

    case 'webext':
      onWebextAppInstalled(callback);

      break;

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
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
