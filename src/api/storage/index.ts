import type { Storage } from './common';
import { getChromiumStorageManager } from './platform/chromium';
import { getWebextStorageManager } from './platform/webext';
import { StorageType } from './common';

const getStorage = (type: StorageType): Storage => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
      return getChromiumStorageManager(type);

    case 'webext':
      return getWebextStorageManager(type);

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
  }
};

export const storage = {
  local: getStorage(StorageType.Local),
  synchronizable: getStorage(StorageType.Synchronizable),
};
