import { Bookmark, BookmarkLocalId, BookmarkManager, isFolder } from './common';
import { Folder, Link } from '../Bookmark';
import { Favicon } from '../Favicon';

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
      favicon: new Favicon(bookmark.url),
      parentIdLocal: bookmark.parentId,
    };

    return link;
  }

  const children = (bookmark.children || []).map((child) => convertBookmarkTreeNodeToBookmark(child, nestingLevel + 1));

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
  getAllBookmarks: async (): Promise<Folder[]> => {
    const bookmarkTreeNodes = await browser.bookmarks.getTree();
    const rootBookmarkTreeNodes = bookmarkTreeNodes[0];

    if (rootBookmarkTreeNodes === undefined) {
      console.warn('browser.bookmarks.getTree() returned empty array for some reason');

      return [];
    }

    return (rootBookmarkTreeNodes.children || [])
      .map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode, 0))
      .filter(isFolder);
  },
  searchBookmarks: async (searchQuery: string): Promise<Bookmark[]> => {
    const bookmarkTreeNodes = await browser.bookmarks.search(searchQuery);

    return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode, 0));
  },
  getFolderChildren: async (folderId: BookmarkLocalId): Promise<Bookmark[]> => {
    const bookmarkTreeNodes = await browser.bookmarks.getSubTree(folderId);

    return bookmarkTreeNodes.map((bookmarkTreeNode) => convertBookmarkTreeNodeToBookmark(bookmarkTreeNode, 0));
  },
};
