import { chromiumBookmarkManager } from './chromiumBookmarkManager';
import { webextBookmarkManager } from './webextBookmarkManager';
import { Bookmark, BookmarkLocalId, Folder } from './bookmark';

export interface BookmarkManager {
  getAllBookmarks: () => Promise<Folder[]>;
  getFolderChildren: (folderId: BookmarkLocalId) => Promise<Bookmark[]>;
  searchBookmarks: (searchQuery: string) => Promise<Bookmark[]>;
}

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
