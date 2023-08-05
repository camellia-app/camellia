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

const convertBookmarkTreeNodeToBookmark = (bookmark: browser.bookmarks.BookmarkTreeNode): Bookmark => {
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

export const getWebextFolderChildrenBookmarks: GetFolderChildrenBookmarks = async (folderBookmarkId) => {
  const bookmarkTreeNodes = await browser.bookmarks.getChildren(folderBookmarkId);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};

export const searchWebextBookmarks: SearchBookmarks = async (searchQuery) => {
  const bookmarkTreeNodes = await browser.bookmarks.search(searchQuery);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};

export const createWebextBookmark: CreateBookmark = async (bookmark) => {
  let createdBookmark: browser.bookmarks.BookmarkTreeNode | undefined = undefined;

  switch (bookmark.type) {
    case 'link':
      createdBookmark = await browser.bookmarks.create({
        parentId: bookmark.parentId,
        title: bookmark.title,
        type: 'bookmark',
        url: bookmark.url,
      });

      break;

    case 'folder':
      createdBookmark = await browser.bookmarks.create({
        parentId: bookmark.parentId,
        title: bookmark.title,
        type: 'folder',
      });

      break;
  }

  return convertBookmarkTreeNodeToBookmark(createdBookmark);
};

export const hasWebextBookmarks: HasBookmarks = async () => {
  const rootBookmarks = await browser.bookmarks.getTree();

  const rootFolder = rootBookmarks[0];

  if (rootFolder === undefined) {
    return false;
  }

  const bookmarkTreeNodes = rootFolder.children ?? [];

  const amountOfBookmarks = bookmarkTreeNodes.reduce((sum, folder) => sum + (folder.children?.length ?? 0), 0);

  return amountOfBookmarks > 0;
};

export const getWebextRootFolderBookmarks: GetRootFolderBookmarks = async () => {
  const rootBookmarks = await browser.bookmarks.getTree();

  const rootFolder = rootBookmarks[0];

  if (rootFolder === undefined) {
    return [];
  }

  const bookmarkTreeNodes = rootFolder.children ?? [];

  return bookmarkTreeNodes
    .map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode))
    .filter((bookmark): bookmark is Folder => isFolder(bookmark));
};

export const initializeWebextRootFolders: InitializeRootFolders = async () => {
  const rootFolders = await getWebextRootFolderBookmarks();

  return rootFolders.map((folder) => folder.id);
};
