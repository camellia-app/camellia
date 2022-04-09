import type { AppEnvironment } from '../common';

export const getWebextAppEnvironment = async (): Promise<AppEnvironment> => {
  const [browserInfo, platformInfo] = await Promise.all([
    browser.runtime.getBrowserInfo(),
    browser.runtime.getPlatformInfo(),
  ]);
  const manifest = browser.runtime.getManifest();

  return {
    app: {
      name: manifest.name,
      version: manifest.version,
    },
    platform: {
      os: platformInfo.os,
      arch: platformInfo.arch,
    },
    browser: {
      name: `${browserInfo.vendor} ${browserInfo.name}`,
      version: `${browserInfo.version} (build ID: ${browserInfo.buildID})`,
    },
  };
};
