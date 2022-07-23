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

const convertBookmarkTreeNodeToBookmark = (bookmark: chrome.bookmarks.BookmarkTreeNode): Bookmark => {
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

export const getChromiumFolderChildrenBookmarks: GetFolderChildrenBookmarks = async (folderBookmarkId) => {
  const bookmarkTreeNodes = await chrome.bookmarks.getChildren(folderBookmarkId);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};

export const getChromiumBookmarksBarChildren: GetBookmarksBarChildren = async () => {
  return getChromiumFolderChildrenBookmarks(BOOKMARK_ID_BOOKMARKS_BAR);
};

export const getChromiumOtherBookmarksChildren: GetOtherBookmarksChildren = async () => {
  return getChromiumFolderChildrenBookmarks(BOOKMARK_ID_OTHER_BOOKMARKS);
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
        title: bookmark.title,
        parentId: bookmark.parentId,
        url: bookmark.url,
      });

      break;

    case 'folder':
      createdBookmark = await chrome.bookmarks.create({
        title: bookmark.title,
        parentId: bookmark.parentId,
      });

      break;
  }

  return convertBookmarkTreeNodeToBookmark(createdBookmark);
};

export const initializeChromiumRootFolders: InitializeRootFolders = async () => {
  return [BOOKMARK_ID_BOOKMARKS_BAR, BOOKMARK_ID_OTHER_BOOKMARKS];
};
