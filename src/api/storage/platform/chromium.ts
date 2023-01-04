import type { Storage, StorageKeyChangeHandler } from '../common';
import { StorageKeyDoesNotExist, StorageType } from '../common';

export const getChromiumStorageManager = (type: StorageType): Storage => {
  switch (type) {
    case StorageType.Local:
      return getChromiumLocalStorageManager();

    case StorageType.Synchronizable:
      return getChromiumSynchronizableStorageManager();
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

const getChromiumLocalStorageManager = (): Storage => {
  const getByKey = async <TValue>(key: string): Promise<TValue> => {
    const data = await chrome.storage.local.get(key);

    const value = data[key];

    if (value === undefined) {
      throw new StorageKeyDoesNotExist(StorageType.Local, key);
    }

    return value;
  };

  return {
    get: getByKey,
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(await chrome.storage.local.get(null));
    },
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
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = function (changes, area: string) {
        if (getStorageAreaTypeByStorageManagerType(StorageType.Local) !== area) {
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
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      await chrome.storage.local.set({
        [key]: value,
      });
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
      throw new StorageKeyDoesNotExist(StorageType.Synchronizable, key);
    }

    return value;
  };

  return {
    get: getByKey,
    getAllKeys: async (): Promise<Array<string>> => {
      return Object.keys(await chrome.storage.sync.get(null));
    },
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
    subscribeToKeyChanges: <TValue>(key: string, handler: StorageKeyChangeHandler<TValue>): (() => void) => {
      const listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = function (changes, area: string) {
        if (getStorageAreaTypeByStorageManagerType(StorageType.Synchronizable) !== area) {
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
    set: async <TValue>(key: string, value: TValue): Promise<void> => {
      await chrome.storage.sync.set({
        [key]: value,
      });
    },
  };
};
