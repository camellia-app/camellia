import { AppPlatform, getPlatform } from '../appEnvironment';
import type { Storage } from './common';
import { StorageType } from './common';
import { getChromiumStorageManager } from './platform/chromium';
import { getWebextStorageManager } from './platform/webext';

const getStorage = (type: StorageType): Storage => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumStorageManager(type);

    case AppPlatform.Webext:
      return getWebextStorageManager(type);
  }
};

export const storage = {
  local: getStorage(StorageType.Local),
  synchronizable: getStorage(StorageType.Synchronizable),
};
