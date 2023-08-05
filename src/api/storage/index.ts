import type { Storage, StorageType } from './common';

import { getPlatform } from '../appEnvironment';
import { getChromiumStorageManager } from './platform/chromium';
import { getWebStorageManager } from './platform/web';
import { getWebextStorageManager } from './platform/webext';

const getStorage = (type: StorageType): Storage => {
  switch (getPlatform()) {
    case 'chromium':
      return getChromiumStorageManager(type);

    case 'webext':
      return getWebextStorageManager(type);

    case 'web':
      return getWebStorageManager(type);
  }
};

export const storage = {
  local: getStorage('local'),
  synchronizable: getStorage('synchronizable'),
};
