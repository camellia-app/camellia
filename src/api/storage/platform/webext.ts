import type { Storage, StorageKeyChangeHandler } from '../common';
import { StorageKeyDoesNotExist, StorageType } from '../common';

export const getWebextStorageManager = (type: StorageType): Storage => {
  switch (type) {
    case StorageType.Local:
      return getWebextLocalStorageManager();

    case StorageType.Synchronizable:
      return getWebextSynchronizableStorageManager();
  }
};

enum StorageAreaType {
  Local = 'local',
  Sync = 'sync',
}

const getStorageAreaTypeByStorageManagerType = (storageManagerType: StorageType): StorageAreaType => {
  switch (storageManagerType) {
    case StorageType.Synchronizable:
      return StorageAreaType.Sync;

    case StorageType.Local:
      return StorageAreaType.Local;
  }
};

const getWebextLocalStorageManager = (): Storage => {
  const getByKey = async <TValue>(key: string): Promise<TValue> => {
    const data = await browser.storage.local.get(key);

    const value = data[key];

    if (value === undefined) {
      throw new StorageKeyDoesNotExist(StorageType.Local, key);
    }

    return value;
  };

  return {
    get: getByKey,
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
        if (getStorageAreaTypeByStorageManagerType(StorageType.Local) !== area) {
          return;
        }

        const changedValue = changes[key];

        if (changedValue === undefined) {
          return;
        }

        handler(changedValue.newValue, changedValue.oldValue);
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
      throw new StorageKeyDoesNotExist(StorageType.Synchronizable, key);
    }

    return value;
  };

  return {
    get: getByKey,
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
        if (getStorageAreaTypeByStorageManagerType(StorageType.Synchronizable) !== area) {
          return;
        }

        const changedValue = changes[key];

        if (changedValue === undefined) {
          return;
        }

        handler(changedValue.newValue, changedValue.oldValue);
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
