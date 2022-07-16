import type { AppInfo } from '../common';

export const getChromiumAppInfo = (): AppInfo => {
  const manifest = chrome.runtime.getManifest();

  return {
    name: manifest.name,
    version: manifest.version,
  };
};
