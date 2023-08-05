import type { Storage, StorageKeyChangeHandler, StorageType } from '../common';

import { StorageKeyDoesNotExist } from '../common';

export const getWebStorageManager = (type: StorageType): Storage => {
  return {
    delete: async (key: string): Promise<void> => {
      localStorage.removeItem(key);

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: key,
          newValue: null,
        }),
      );
    },
    exists: async (key: string): Promise<boolean> => {
      return localStorage.getItem(key) !== null;
    },
    get: async <TValue>(key: string): Promise<TValue> => {
      const value = localStorage.getItem(key);

      if (value === null) {
        throw new StorageKeyDoesNotExist(type, key);
      }

      return JSON.parse(value);
    },
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(localStorage);
    },
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      localStorage.setItem(key, JSON.stringify(value));

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: key,
          newValue: JSON.stringify(value),
        }),
      );
    },
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener = (event: StorageEvent): void => {
        if (event.key !== key) {
          return;
        }

        const newValue = event.newValue !== null ? JSON.parse(event.newValue) : undefined;

        handler(newValue);
      };

      window.addEventListener('storage', listener);

      return (): void => {
        window.removeEventListener('storage', listener);
      };
    },
  };
};
