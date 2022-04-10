import { chromiumBookmarkManager } from './chromiumBookmarkManager';
import { webextBookmarkManager } from './webextBookmarkManager';
import type { BookmarkManager } from './bookmarkManager';
import { AppPlatform, getPlatform } from '../api/appEnvironment';

export const getBookmarkManager = (): BookmarkManager => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return chromiumBookmarkManager;

    case AppPlatform.Webext:
      return webextBookmarkManager;
  }
};
