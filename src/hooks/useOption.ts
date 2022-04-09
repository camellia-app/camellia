import { useEffect, useState } from 'react';
import { getOption, setOption, subscribeToOptionChanges } from '../api/options';
import type { OptionKey, OptionsTypeMap } from '../api/options/options';

type Dispatch<TValue> = (newValue: TValue) => void;

export const useOption = <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
): [TValue | undefined, Dispatch<TValue>] => {
  const [value, setValue] = useState<TValue | undefined>(undefined);

  useEffect(() => {
    getOption<TKey, TValue>(key).then((optionValue) => {
      setValue(optionValue);
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

  return [
    value,
    (newValue): void => {
      setOption<TKey, TValue>(key, newValue);
    },
  ];
};
