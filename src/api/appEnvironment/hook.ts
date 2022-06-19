import { useEffect, useState } from 'react';
import type { AppEnvironment } from './common';
import { getAppEnvironment } from './index';

export const useAppEnvironment = (): AppEnvironment | undefined => {
  const [value, setValue] = useState<AppEnvironment | undefined>(undefined);

  useEffect(() => {
    getAppEnvironment().then((appEnvironment) => {
      setValue(appEnvironment);
    });
  }, []);

  return value;
};
