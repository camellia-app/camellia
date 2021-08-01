import {
  Bookmark, BookmarkLocalId, Folder, Link,
} from './Bookmark';
import {Favicon} from "./Favicon";

const normalizeBookmarkFromBrowserBookmark = (bookmark: browser.bookmarks.BookmarkTreeNode, nestingLevel: number): Bookmark => {
  if (bookmark.url !== undefined) {
    const link: Link = {
      idLocal: bookmark.id,
      title: bookmark.title,
      nestingLevel: nestingLevel,
      url: bookmark.url,
      type: 'link',
      favicon: new Favicon(bookmark.url),
    }

    return link;
  }

  const children = (bookmark.children || []).map((child) => normalizeBookmarkFromBrowserBookmark(child, nestingLevel + 1));

  const folder: Folder = {
    idLocal: bookmark.id,
    title: bookmark.title,
    nestingLevel: nestingLevel,
    children: children,
    isRootFolder: bookmark.parentId === undefined,
    type: "folder"
  };

  return folder;
};

const getFolderChildren = async (id: BookmarkLocalId): Promise<Bookmark[]> => {
  let bookmarks: Bookmark[];

  if (chrome !== undefined && chrome.bookmarks !== undefined) {
    bookmarks = await new Promise((resolve) => chrome.bookmarks.getSubTree(id, (data) => {
      resolve(data.map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark, 0)));
    }));
  } else {
    bookmarks = (await browser.bookmarks.getSubTree(id))
      .map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark, 0));
  }

  const bookmark = bookmarks[0];

  if (bookmark.type === 'folder') {
    return bookmark.children;
  }

  return [];
};

export const getTree = async (): Promise<Folder[]> => {
  let bookmarks: Bookmark[];

  if (chrome !== undefined && chrome.bookmarks !== undefined) {
    bookmarks = await new Promise((resolve) => chrome.bookmarks.getTree((data) => {
      resolve((data[0].children || [])
        .map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark, 0)));
    }));
  } else {
    bookmarks = ((await browser.bookmarks.getTree())[0].children || [])
      .map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark, 0));
  }

  return bookmarks as Folder[];
};

export const openBookmarkManager = async (): Promise<void> => {
  if (chrome === undefined || chrome.tabs === undefined) {
    throw Error('This browser does not have bookmark manager.');
  }

  return new Promise((resolve) => chrome.tabs.create({
    url: 'chrome://bookmarks',
  }, () => resolve()));
};

export const search = async (query: string): Promise<Bookmark[]> => {
  let bookmarks: Bookmark[];

  if (chrome !== undefined && chrome.bookmarks !== undefined) {
    bookmarks = await new Promise((resolve) => chrome.bookmarks.search(query, (data) => {
      resolve(data.map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark, 0)));
    }));
  } else {
    bookmarks = (await browser.bookmarks.search(query))
      .map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark, 0));
  }

  return Promise.all(bookmarks.map(async (bookmark) => {
    if (bookmark.type === 'folder') {
      return {
        ...bookmark,
        children: await getFolderChildren(bookmark.idLocal),
      };
    }

    return bookmark;
  }));
};
