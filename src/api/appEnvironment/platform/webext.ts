import type { AppEnvironment } from '../common';

export const getWebextAppEnvironment = async (): Promise<AppEnvironment> => {
  const [browserInfo, platformInfo] = await Promise.all([
    browser.runtime.getBrowserInfo(),
    browser.runtime.getPlatformInfo(),
  ]);

  return {
    browser: {
      name: `${browserInfo.vendor} ${browserInfo.name}`,
      version: `${browserInfo.version} (build ID: ${browserInfo.buildID})`,
    },
    platform: {
      arch: platformInfo.arch,
      os: platformInfo.os,
    },
  };
};
