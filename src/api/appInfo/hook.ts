import { getActiveTransaction } from '@sentry/tracing';
import { SENTRY_SPAN_STATUS_OK } from '../utils/sentry';
import type { AppInfo } from './common';
import { getAppInfo } from './index';

export const useAppInfo = (): AppInfo => {
  const span = getActiveTransaction()?.startChild({
    op: 'useAppInfo',
  });

  const appInfo = getAppInfo();

  span?.setStatus(SENTRY_SPAN_STATUS_OK);
  span?.finish();

  return appInfo;
};
