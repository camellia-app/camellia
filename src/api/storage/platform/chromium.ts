import type { Storage, StorageKeyChangeHandler, StorageType } from '../common';

import { StorageKeyDoesNotExist } from '../common';

export const getChromiumStorageManager = (type: StorageType): Storage => {
  switch (type) {
    case 'local':
      return getChromiumLocalStorageManager();

    case 'synchronizable':
      return getChromiumSynchronizableStorageManager();
  }
};

type StorageAreaType = 'local' | 'sync';

const getStorageAreaTypeByStorageManagerType = (storageManagerType: StorageType): StorageAreaType => {
  switch (storageManagerType) {
    case 'synchronizable':
      return 'sync';

    case 'local':
      return 'local';
  }
};

const getChromiumLocalStorageManager = (): Storage => {
  const getByKey = async <TValue>(key: string): Promise<TValue> => {
    const data = await chrome.storage.local.get(key);

    const value = data[key];

    if (value === undefined) {
      throw new StorageKeyDoesNotExist('local', key);
    }

    return value;
  };

  return {
    delete: async (key: string): Promise<void> => {
      await chrome.storage.local.remove(key);
    },
    exists: async (key: string): Promise<boolean> => {
      try {
        await getByKey(key);
      } catch (error) {
        if (!(error instanceof StorageKeyDoesNotExist)) {
          throw error;
        }

        return false;
      }

      return true;
    },
    get: getByKey,
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(await chrome.storage.local.get(null));
    },
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      await chrome.storage.local.set({
        [key]: value,
      });
    },
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = function (changes, area: string) {
        if (getStorageAreaTypeByStorageManagerType('local') !== area) {
          return;
        }

        const changedValue = changes[key];

        if (changedValue === undefined) {
          return;
        }

        handler(changedValue.newValue);
      };

      chrome.storage.onChanged.addListener(listener);

      return (): void => {
        chrome.storage.onChanged.removeListener(listener);
      };
    },
  };
};

const getChromiumSynchronizableStorageManager = (): Storage => {
  if (chrome.storage.sync === undefined) {
    return getChromiumLocalStorageManager();
  }

  const getByKey = async <TValue>(key: string): Promise<TValue> => {
    const data = await chrome.storage.sync.get(key);

    const value = data[key];

    if (value === undefined) {
      throw new StorageKeyDoesNotExist('synchronizable', key);
    }

    return value;
  };

  return {
    delete: async (key: string): Promise<void> => {
      await chrome.storage.sync.remove(key);
    },
    exists: async (key: string): Promise<boolean> => {
      try {
        await getByKey(key);
      } catch (error) {
        if (!(error instanceof StorageKeyDoesNotExist)) {
          throw error;
        }

        return false;
      }

      return true;
    },
    get: getByKey,
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(await chrome.storage.sync.get(null));
    },
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      await chrome.storage.sync.set({
        [key]: value,
      });
    },
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = function (changes, area: string) {
        if (getStorageAreaTypeByStorageManagerType('synchronizable') !== area) {
          return;
        }

        const changedValue = changes[key];

        if (changedValue === undefined) {
          return;
        }

        handler(changedValue.newValue);
      };

      chrome.storage.onChanged.addListener(listener);

      return (): void => {
        chrome.storage.onChanged.removeListener(listener);
      };
    },
  };
};
