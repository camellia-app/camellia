import type {
  Bookmark,
  Folder,
  Link,
  GetFolderChildrenBookmarks,
  SearchBookmarks,
  GetBookmarksBarChildren,
  GetOtherBookmarksChildren,
  CreateBookmark,
  InitializeRootFolders,
} from '../common';

const BOOKMARK_ID_BOOKMARKS_BAR = '1';
const BOOKMARK_ID_OTHER_BOOKMARKS = '2';

const convertBookmarkTreeNodeToBookmark = (bookmark: browser.bookmarks.BookmarkTreeNode): Bookmark => {
  if (bookmark.url !== undefined) {
    const link: Link = {
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      type: 'link',
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

export const getWebextBookmarksBarChildren: GetBookmarksBarChildren = async () => {
  return getWebextFolderChildrenBookmarks(BOOKMARK_ID_BOOKMARKS_BAR);
};

export const getWebextOtherBookmarksChildren: GetOtherBookmarksChildren = async () => {
  return getWebextFolderChildrenBookmarks(BOOKMARK_ID_OTHER_BOOKMARKS);
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
        title: bookmark.title,
        parentId: bookmark.parentId,
        url: bookmark.url,
        type: 'bookmark',
      });

      break;

    case 'folder':
      createdBookmark = await browser.bookmarks.create({
        title: bookmark.title,
        parentId: bookmark.parentId,
        type: 'folder',
      });

      break;
  }

  return convertBookmarkTreeNodeToBookmark(createdBookmark);
};

export const initializeWebextRootFolders: InitializeRootFolders = async () => {
  return [BOOKMARK_ID_BOOKMARKS_BAR, BOOKMARK_ID_OTHER_BOOKMARKS];
};
