import { chromiumBookmarkManager } from './chromiumBookmarkManager';
import { webextBookmarkManager } from './webextBookmarkManager';
import type { BookmarkManager } from './bookmarkManager';

export const getBookmarkManager = (): BookmarkManager => {
  switch (process.env['TARGET_PLATFORM']) {
    case 'chromium':
      return chromiumBookmarkManager;

    case 'webext':
      return webextBookmarkManager;

    default:
      throw new Error(`Unknown platform: ${process.env['TARGET_PLATFORM']}`);
  }
};
