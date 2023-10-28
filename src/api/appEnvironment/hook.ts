import { getActiveTransaction } from '@sentry/react';
import { useEffect, useState } from 'react';

import type { AppEnvironment } from './common';

import { SENTRY_SPAN_STATUS_OK } from '../utils/sentry';
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
