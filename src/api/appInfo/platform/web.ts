import type { AppInfo } from '../common';

import { config } from '../../../config';

export const getWebAppInfo = (): AppInfo => {
  return {
    name: 'Camellia',
    version: config.appVersion,
  };
};
