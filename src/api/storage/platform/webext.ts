import type { Storage, StorageKeyChangeHandler, StorageType } from '../common';
import { StorageKeyDoesNotExist } from '../common';

export const getWebextStorageManager = (type: StorageType): Storage => {
  switch (type) {
    case 'local':
      return getWebextLocalStorageManager();

    case 'synchronizable':
      return getWebextSynchronizableStorageManager();
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

const getWebextLocalStorageManager = (): Storage => {
  const getByKey = async <TValue>(key: string): Promise<TValue> => {
    const data = await browser.storage.local.get(key);

    const value = data[key];

    if (value === undefined) {
      throw new StorageKeyDoesNotExist('local', key);
    }

    return value;
  };

  return {
    get: getByKey,
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(await browser.storage.local.get());
    },
    delete: async (key: string): Promise<void> => {
      await browser.storage.local.remove(key);
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
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener: Parameters<typeof browser.storage.onChanged.addListener>[0] = function (changes, area: string) {
        if (getStorageAreaTypeByStorageManagerType('local') !== area) {
          return;
        }

        const changedValue = changes[key];

        if (changedValue === undefined) {
          return;
        }

        handler(changedValue.newValue);
      };

      browser.storage.onChanged.addListener(listener);

      return (): void => {
        browser.storage.onChanged.removeListener(listener);
      };
    },
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      await browser.storage.local.set({
        [key]: value,
      });
    },
  };
};

const getWebextSynchronizableStorageManager = (): Storage => {
  if (browser.storage.sync === undefined) {
    return getWebextLocalStorageManager();
  }

  const getByKey = async <TValue>(key: string): Promise<TValue> => {
    const data = await browser.storage.sync.get(key);

    const value = data[key];

    if (value === undefined) {
      throw new StorageKeyDoesNotExist('synchronizable', key);
    }

    return value;
  };

  return {
    get: getByKey,
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(await browser.storage.sync.get());
    },
    delete: async (key: string): Promise<void> => {
      await browser.storage.sync.remove(key);
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
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener: Parameters<typeof browser.storage.onChanged.addListener>[0] = function (changes, area: string) {
        if (getStorageAreaTypeByStorageManagerType('synchronizable') !== area) {
          return;
        }

        const changedValue = changes[key];

        if (changedValue === undefined) {
          return;
        }

        handler(changedValue.newValue);
      };

      browser.storage.onChanged.addListener(listener);

      return (): void => {
        browser.storage.onChanged.removeListener(listener);
      };
    },
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      await browser.storage.sync.set({
        [key]: value,
      });
    },
  };
};
