import type {
  Bookmark,
  BookmarkId,
  CreateBookmark,
  Folder,
  GetFolderChildrenBookmarks,
  GetRootFolderBookmarks,
  HasBookmarks,
  InitializeRootFolders,
  SearchBookmarks,
} from './common';

import { getPlatform } from '../appEnvironment';
import topWebsites from './assets/top-websites.json';
import {
  createChromiumBookmark,
  getChromiumFolderChildrenBookmarks,
  getChromiumRootFolderBookmarks,
  hasChromiumBookmarks,
  initializeChromiumRootFolders,
  searchChromiumBookmarks,
} from './platform/chromium';
import {
  createWebBookmark,
  getWebFolderChildrenBookmarks,
  getWebRootFolderBookmarks,
  hasWebBookmarks,
  initializeWebRootFolders,
  searchWebBookmarks,
} from './platform/web';
import {
  getWebextFolderChildrenBookmarks,
  getWebextRootFolderBookmarks,
  hasWebextBookmarks,
  initializeWebextRootFolders,
} from './platform/webext';

export const getFolderChildrenBookmarks: GetFolderChildrenBookmarks = async (folderBookmarkId) => {
  let bookmarks: Array<Bookmark> = [];

  switch (getPlatform()) {
    case 'chromium':
      bookmarks = await getChromiumFolderChildrenBookmarks(folderBookmarkId);

      break;

    case 'webext':
      bookmarks = await getWebextFolderChildrenBookmarks(folderBookmarkId);

      break;

    case 'web':
      bookmarks = await getWebFolderChildrenBookmarks(folderBookmarkId);

      break;
  }

  return bookmarks;
};

export const searchBookmarks: SearchBookmarks = async (searchQuery) => {
  let bookmarks: Array<Bookmark> = [];

  switch (getPlatform()) {
    case 'chromium':
      bookmarks = await searchChromiumBookmarks(searchQuery);

      break;

    case 'webext':
      bookmarks = await searchWebBookmarks(searchQuery);

      break;

    case 'web':
      bookmarks = await searchWebBookmarks(searchQuery);

      break;
  }

  return bookmarks;
};

export const createBookmark: CreateBookmark = async (bookmark) => {
  let createdBookmark: Bookmark;

  switch (getPlatform()) {
    case 'chromium':
      createdBookmark = await createChromiumBookmark(bookmark);

      break;

    case 'webext':
      createdBookmark = await createWebBookmark(bookmark);

      break;

    case 'web':
      createdBookmark = await createWebBookmark(bookmark);

      break;
  }

  return createdBookmark;
};

export const hasBookmarks: HasBookmarks = async () => {
  switch (getPlatform()) {
    case 'chromium':
      return await hasChromiumBookmarks();

    case 'webext':
      return await hasWebextBookmarks();

    case 'web':
      return await hasWebBookmarks();
  }
};

export const getRootFolderBookmarks: GetRootFolderBookmarks = async () => {
  let bookmarks: Array<Folder> = [];

  switch (getPlatform()) {
    case 'chromium':
      bookmarks = await getChromiumRootFolderBookmarks();

      break;

    case 'webext':
      bookmarks = await getWebextRootFolderBookmarks();

      break;

    case 'web':
      bookmarks = await getWebRootFolderBookmarks();

      break;
  }

  return bookmarks;
};

const initializeRootFolders: InitializeRootFolders = async () => {
  let bookmarks: Array<BookmarkId> = [];

  switch (getPlatform()) {
    case 'chromium':
      bookmarks = await initializeChromiumRootFolders();

      break;

    case 'webext':
      bookmarks = await initializeWebextRootFolders();

      break;

    case 'web':
      bookmarks = await initializeWebRootFolders();

      break;
  }

  return bookmarks;
};

export const generateDemoBookmarks = async (): Promise<void> => {
  const folderIds = await initializeRootFolders();

  let folderNumber = 1;

  for (const topWebsite of topWebsites) {
    const folderId = folderIds[Math.floor(Math.random() * folderIds.length)];

    await createBookmark({
      parentId: folderId,
      title: topWebsite,
      type: 'link',
      url: `https://${topWebsite}`,
    });

    const shouldCreateFolder = Math.random() >= 0.7;

    if (shouldCreateFolder) {
      const createdFolder = await createBookmark({
        parentId: folderId,
        title: `Folder #${folderNumber}`,
        type: 'folder',
      });

      folderNumber++;

      folderIds.push(createdFolder.id);
    }
  }
};
