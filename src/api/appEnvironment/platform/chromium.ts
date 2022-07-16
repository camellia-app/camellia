import { detect } from 'detect-browser';
import type { AppEnvironment } from '../common';

export const getChromiumAppEnvironment = async (): Promise<AppEnvironment> => {
  const browserInfo = detect();
  const platformInfo = await new Promise<chrome.runtime.PlatformInfo>((resolve) => {
    chrome.runtime.getPlatformInfo(resolve);
  });

  const browserName = browserInfo?.name;
  const browserVersion = browserInfo?.version;

  return {
    browser: {
      name: typeof browserName === 'string' ? browserName : 'unknown',
      version: typeof browserVersion === 'string' ? browserVersion : 'unknown',
    },
    platform: {
      os: platformInfo.os,
      arch: platformInfo.arch,
    },
  };
};
