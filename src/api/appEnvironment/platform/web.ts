import type { AppEnvironment } from '../common';

export const getWebAppEnvironment = async (): Promise<AppEnvironment> => {
  return {
    browser: {
      name: window.navigator.userAgent,
      version: 'unknown version',
    },
    platform: {
      os: 'unknown os',
      arch: 'unknown arch',
    },
  };
};
