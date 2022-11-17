import { getActiveTransaction } from '@sentry/tracing';
import { useEffect, useState } from 'react';
import { SENTRY_SPAN_STATUS_OK } from '../utils/sentry';
import type { AppEnvironment } from './common';
import { getAppEnvironment } from './index';

export const useAppEnvironment = (): AppEnvironment | undefined => {
  const [value, setValue] = useState<AppEnvironment | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useAppEnvironment',
    });

    getAppEnvironment()
      .then((appEnvironment) => {
        setValue(appEnvironment);

        span?.setStatus(SENTRY_SPAN_STATUS_OK);
      })
      .finally(() => {
        span?.finish();
      });
  }, []);

  return value;
};
