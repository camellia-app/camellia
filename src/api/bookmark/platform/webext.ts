import type {
  Bookmark,
  Folder,
  Link,
  GetFolderChildrenBookmarks,
  SearchBookmarks,
  GetBookmarksBarChildren,
  GetOtherBookmarksChildren,
} from '../common';

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
  return getWebextFolderChildrenBookmarks('1');
};

export const getWebextOtherBookmarksChildren: GetOtherBookmarksChildren = async () => {
  return getWebextFolderChildrenBookmarks('2');
};

export const searchWebextBookmarks: SearchBookmarks = async (searchQuery) => {
  const bookmarkTreeNodes = await browser.bookmarks.search(searchQuery);

  return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode));
};
