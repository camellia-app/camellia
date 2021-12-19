import type { Bookmark, BookmarkLocalId, Folder, Link } from './bookmark';
import { isFolder } from './bookmark';
import type { BookmarkManager } from './bookmarkManager';

const convertBookmarkTreeNodeToBookmark = (
  bookmark: browser.bookmarks.BookmarkTreeNode,
  nestingLevel: number,
): Bookmark => {
  if (bookmark.url !== undefined) {
    const link: Link = {
      idLocal: bookmark.id,
      title: bookmark.title,
      nestingLevel: nestingLevel,
      url: bookmark.url,
      type: 'link',
      parentIdLocal: bookmark.parentId,
    };

    return link;
  }

  const children = (bookmark.children !== undefined ? bookmark.children : []).map((child) =>
    convertBookmarkTreeNodeToBookmark(child, nestingLevel + 1),
  );

  const folder: Folder = {
    idLocal: bookmark.id,
    title: bookmark.title,
    nestingLevel: nestingLevel,
    children: children,
    isRootFolder: bookmark.parentId === undefined,
    type: 'folder',
    parentIdLocal: bookmark.parentId,
  };

  return folder;
};

export const webextBookmarkManager: BookmarkManager = {
  getAllBookmarks: async (): Promise<Array<Folder>> => {
    const bookmarkTreeNodes = await browser.bookmarks.getTree();
    const rootBookmarkTreeNodes = bookmarkTreeNodes[0];

    if (rootBookmarkTreeNodes === undefined) {
      console.warn('browser.bookmarkManager.getTree() returned empty array for some reason');

      return [];
    }

    return (rootBookmarkTreeNodes.children !== undefined ? rootBookmarkTreeNodes.children : [])
      .map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode, 0))
      .filter(isFolder);
  },
  searchBookmarks: async (searchQuery: string): Promise<Array<Bookmark>> => {
    const bookmarkTreeNodes = await browser.bookmarks.search(searchQuery);

    return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode, 0));
  },
  getFolderChildren: async (folderId: BookmarkLocalId): Promise<Array<Bookmark>> => {
    const bookmarkTreeNodes = await browser.bookmarks.getSubTree(folderId);

    if (bookmarkTreeNodes[0] === undefined) {
      throw new Error('Folder not found by given ID');
    }

    return (bookmarkTreeNodes[0].children ?? []).map((bookmarkTreeNode) =>
      convertBookmarkTreeNodeToBookmark(bookmarkTreeNode, 0),
    );
  },
};
