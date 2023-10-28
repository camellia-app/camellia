import { getActiveTransaction } from '@sentry/react';
import { useCallback, useEffect, useState } from 'react';

import type { OptionKey, OptionsTypeMap } from './options';

import { SENTRY_SPAN_STATUS_OK } from '../utils/sentry';
import { getOption, setOption, subscribeToOptionChanges } from './index';

type Dispatch<TValue> = (newValue: TValue) => void;

export const useOption = <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
): [TValue | undefined, Dispatch<TValue>] => {
  const [value, setValue] = useState<TValue | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      description: key,
      op: 'useOption.getOption',
    });

    getOption<TKey, TValue>(key)
      .then((optionValue) => {
        span?.setStatus(SENTRY_SPAN_STATUS_OK);

        setValue(optionValue);
      })
      .finally(() => {
        span?.finish();
      });
  }, [key]);

  useEffect(() => {
    const unsubscribe = subscribeToOptionChanges<TKey, TValue>(key, (newValue) => {
      setValue(newValue);
    });

    return (): void => {
      unsubscribe();
    };
  }, [key]);

  const setOptionDispatcher = useCallback<Dispatch<TValue>>(
    (newValue): void => {
      const span = getActiveTransaction()?.startChild({
        description: key,
        op: 'useOption.setOption',
      });

      setOption<TKey, TValue>(key, newValue)
        .then(() => {
          span?.setStatus(SENTRY_SPAN_STATUS_OK);
        })
        .finally(() => {
          span?.finish();
        });
    },
    [key],
  );

  return [value, setOptionDispatcher];
};
