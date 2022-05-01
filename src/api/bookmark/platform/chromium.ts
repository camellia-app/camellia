import type {
  Bookmark,
  Folder,
  Link,
  GetFolderChildrenBookmarks,
  SearchBookmarks,
  GetBookmarksBarChildren,
  GetOtherBookmarksChildren,
} from '../common';

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
  return getChromiumFolderChildrenBookmarks('1');
};

export const getChromiumOtherBookmarksChildren: GetOtherBookmarksChildren = async () => {
  return getChromiumFolderChildrenBookmarks('2');
};

export const searchChromiumBookmarks: SearchBookmarks = async (searchQuery) => {
  const bookmarkTreeNodes = await chrome.bookmarks.search(searchQuery);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};
