import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../storage';
import { StorageKeyDoesNotExist } from '../../storage/common';
import type {
  BookmarkId,
  CreateBookmark,
  Folder,
  GetBookmarksBarChildren,
  GetFolderChildrenBookmarks,
  GetOtherBookmarksChildren,
  Link,
  SearchBookmarks,
  InitializeRootFolders,
} from '../common';
import { isLink } from '../common';

const STORAGE_KEY_BOOKMARK_ID_BOOKMARKS_BAR = 'bookmark_id_bookmarks_bar';
const STORAGE_KEY_BOOKMARK_ID_OTHER_BOOKMARKS = 'bookmark_id_other_bookmarks';

type WebStorageBookmarkFolder = Folder & {
  childrenIds: Array<BookmarkId>;
};

type WebStorageBookmarkLink = Link;

export type WebStorageBookmark = WebStorageBookmarkFolder | WebStorageBookmarkLink;

const getBookmark = async (bookmarkId: BookmarkId): Promise<WebStorageBookmark> => {
  const syncStorage = storage.synchronizable;

  return await syncStorage.get<WebStorageBookmark>(`bookmark-${bookmarkId}`);
};

const setBookmark = async (bookmark: WebStorageBookmark): Promise<void> => {
  const syncStorage = storage.synchronizable;

  await syncStorage.set<WebStorageBookmark>(`bookmark-${bookmark.id}`, bookmark);
};

export const getWebFolderChildrenBookmarks: GetFolderChildrenBookmarks = async (folderBookmarkId) => {
  const bookmark = await getBookmark(folderBookmarkId);

  if (bookmark.type !== 'folder') {
    throw new Error('Not a folder!');
  }

  return await Promise.all(bookmark.childrenIds.map((childBookmarkId) => getBookmark(childBookmarkId)));
};

export const geWebBookmarksBarChildren: GetBookmarksBarChildren = async () => {
  const syncStorage = storage.synchronizable;

  let bookmarksBarBookmarkId: string | undefined = undefined;

  try {
    bookmarksBarBookmarkId = await syncStorage.get<string>(STORAGE_KEY_BOOKMARK_ID_BOOKMARKS_BAR);
  } catch (error) {
    if (!(error instanceof StorageKeyDoesNotExist)) {
      throw error;
    }

    console.warn('Bookmark ID of "Bookmarks bar" folder not found in the storage');

    return [];
  }

  return getWebFolderChildrenBookmarks(bookmarksBarBookmarkId);
};

export const getWebOtherBookmarksChildren: GetOtherBookmarksChildren = async () => {
  const syncStorage = storage.synchronizable;

  let otherBookmarksBookmarkId: string | undefined = undefined;

  try {
    otherBookmarksBookmarkId = await syncStorage.get<string>(STORAGE_KEY_BOOKMARK_ID_OTHER_BOOKMARKS);
  } catch (error) {
    if (!(error instanceof StorageKeyDoesNotExist)) {
      throw error;
    }

    console.warn('Bookmark ID of "Other bookmarks" folder not found in the storage');

    return [];
  }

  return getWebFolderChildrenBookmarks(otherBookmarksBookmarkId);
};

export const searchWebBookmarks: SearchBookmarks = async (searchQuery) => {
  if (searchQuery === '') {
    return [];
  }

  const syncStorage = storage.synchronizable;

  const allStorageKeys = await syncStorage.getAllKeys();
  const allBookmarks = await Promise.all(
    allStorageKeys
      .filter((storageKey) => storageKey.startsWith('bookmark-'))
      .map((storageKey) => storageKey.replace('bookmark-', ''))
      .map((bookmarkId) => getBookmark(bookmarkId)),
  );

  return allBookmarks.filter((bookmark) => {
    if (bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }

    if (isLink(bookmark) && bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }

    return false;
  });
};

/**
 * @remarks
 *
 * Important to note that this function is potentially affected by race condition
 * if it's called in multiple parallel promises with same `parentId`.
 */
export const createWebBookmark: CreateBookmark = async (bookmark) => {
  const bookmarkId = uuidv4();

  let createdBookmark: WebStorageBookmark | undefined = undefined;

  switch (bookmark.type) {
    case 'link':
      createdBookmark = {
        type: 'link',
        id: bookmarkId,
        title: bookmark.title,
        url: bookmark.url,
      };

      break;

    case 'folder':
      createdBookmark = {
        type: 'folder',
        id: bookmarkId,
        title: bookmark.title,
        childrenIds: [],
      };

      break;
  }

  await setBookmark(createdBookmark);

  if (bookmark.parentId !== undefined) {
    const parentFolder = await getBookmark(bookmark.parentId);

    if (parentFolder.type !== 'folder') {
      throw new Error('Passed parentId is not a folder');
    }

    parentFolder.childrenIds.push(bookmarkId);

    await setBookmark(parentFolder);
  }

  return createdBookmark;
};

export const initializeWebRootFolders: InitializeRootFolders = async () => {
  const folderIds: Array<BookmarkId> = [];

  try {
    const bookmarksBarFolderId = await storage.synchronizable.get<string>(STORAGE_KEY_BOOKMARK_ID_BOOKMARKS_BAR);

    folderIds.push(bookmarksBarFolderId);
  } catch (error: unknown) {
    if (!(error instanceof StorageKeyDoesNotExist)) {
      throw error;
    }

    const bookmarksBarFolder = await createWebBookmark({
      type: 'folder',
      title: 'Bookmarks bar',
    });

    await storage.synchronizable.set(STORAGE_KEY_BOOKMARK_ID_BOOKMARKS_BAR, bookmarksBarFolder.id);

    folderIds.push(bookmarksBarFolder.id);
  }

  try {
    const otherBookmarksFolderId = await storage.synchronizable.get<string>(STORAGE_KEY_BOOKMARK_ID_OTHER_BOOKMARKS);

    folderIds.push(otherBookmarksFolderId);
  } catch (error: unknown) {
    if (!(error instanceof StorageKeyDoesNotExist)) {
      throw error;
    }

    const otherBookmarksFolder = await createWebBookmark({
      type: 'folder',
      title: 'Other bookmarks',
    });

    await storage.synchronizable.set(STORAGE_KEY_BOOKMARK_ID_OTHER_BOOKMARKS, otherBookmarksFolder.id);

    folderIds.push(otherBookmarksFolder.id);
  }

  return folderIds;
};
