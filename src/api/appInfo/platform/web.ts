import { config } from '../../../config';
import type { AppInfo } from '../common';

export const getWebAppInfo = (): AppInfo => {
  return {
    name: 'Camellia',
    version: config.appVersion,
  };
};
