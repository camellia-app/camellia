import type {
  Bookmark,
  CreateBookmark,
  Folder,
  GetFolderChildrenBookmarks,
  GetRootFolderBookmarks,
  HasBookmarks,
  InitializeRootFolders,
  Link,
  SearchBookmarks,
} from '../common';

import { isFolder } from '../common';

const convertBookmarkTreeNodeToBookmark = (bookmark: chrome.bookmarks.BookmarkTreeNode): Bookmark => {
  if (bookmark.url !== undefined) {
    const link: Link = {
      id: bookmark.id,
      title: bookmark.title,
      type: 'link',
      url: bookmark.url,
    };

    return link;
  }

  const folder: Folder = {
    id: bookmark.id,
    title: bookmark.title,
    type: 'folder',
  };

  return folder;
};

export const getChromiumFolderChildrenBookmarks: GetFolderChildrenBookmarks = async (folderBookmarkId) => {
  const bookmarkTreeNodes = await chrome.bookmarks.getChildren(folderBookmarkId);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};

export const searchChromiumBookmarks: SearchBookmarks = async (searchQuery) => {
  const bookmarkTreeNodes = await chrome.bookmarks.search(searchQuery);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};

export const createChromiumBookmark: CreateBookmark = async (bookmark) => {
  let createdBookmark: chrome.bookmarks.BookmarkTreeNode | undefined = undefined;

  switch (bookmark.type) {
    case 'link':
      createdBookmark = await chrome.bookmarks.create({
        parentId: bookmark.parentId,
        title: bookmark.title,
        url: bookmark.url,
      });

      break;

    case 'folder':
      createdBookmark = await chrome.bookmarks.create({
        parentId: bookmark.parentId,
        title: bookmark.title,
      });

      break;
  }

  return convertBookmarkTreeNodeToBookmark(createdBookmark);
};

export const hasChromiumBookmarks: HasBookmarks = async () => {
  const rootBookmarks = await chrome.bookmarks.getTree();

  const rootFolder = rootBookmarks[0];

  if (rootFolder === undefined) {
    return false;
  }

  const bookmarkTreeNodes = rootFolder.children ?? [];

  const amountOfBookmarks = bookmarkTreeNodes.reduce((sum, folder) => sum + (folder.children?.length ?? 0), 0);

  return amountOfBookmarks > 0;
};

export const getChromiumRootFolderBookmarks: GetRootFolderBookmarks = async () => {
  const rootBookmarks = await chrome.bookmarks.getTree();

  const rootFolder = rootBookmarks[0];

  if (rootFolder === undefined) {
    return [];
  }

  const bookmarkTreeNodes = rootFolder.children ?? [];

  return bookmarkTreeNodes
    .map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode))
    .filter((bookmark): bookmark is Folder => isFolder(bookmark));
};

export const initializeChromiumRootFolders: InitializeRootFolders = async () => {
  const rootFolders = await getChromiumRootFolderBookmarks();

  return rootFolders.map((folder) => folder.id);
};
