import type { AppInfo } from './common';
import { getAppInfo } from './index';

export const useAppInfo = (): AppInfo => {
  return getAppInfo();
};
