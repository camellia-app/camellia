import { Favicon } from '../Favicon';
import { chromiumBookmarkManager } from './chromiumBookmarkManager';
import { webextBookmarkManager } from './webextBookmarkManager';

export type BookmarkLocalId = string;

export type Bookmark = Link | Folder;

interface BookmarkCommon {
  idLocal: BookmarkLocalId;
  nestingLevel: number;
  parentIdLocal: BookmarkLocalId | undefined;
  title: string;
}

export interface Link extends BookmarkCommon {
  favicon: Favicon;
  type: 'link';
  url: string;
}

export interface Folder extends BookmarkCommon {
  children: Bookmark[];
  isRootFolder: boolean;
  type: 'folder';
}

export function isFolder(bookmark: Bookmark): bookmark is Folder {
  return bookmark.type === 'folder';
}

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
