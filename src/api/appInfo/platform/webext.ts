import type { AppInfo } from '../common';

export const getWebextAppInfo = (): AppInfo => {
  const manifest = browser.runtime.getManifest();

  return {
    name: manifest.name,
    version: manifest.version,
  };
};
