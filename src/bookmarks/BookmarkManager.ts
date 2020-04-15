import Bookmark from './Bookmark';
import Link from './Link';
import Folder from './Folder';
import BookmarkRootCategory from './BookmarkRootCategory';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

function normalizeBookmarkFromBrowserBookmark(bookmark: BookmarkTreeNode): Bookmark {
  if (bookmark.url !== undefined) {
    return new Link(
      bookmark.id,
      bookmark.title,
      bookmark.url,
    );
  }

  const children = (bookmark.children || []).map((child) => normalizeBookmarkFromBrowserBookmark(child));

  if (bookmark.parentId === undefined) {
    return new BookmarkRootCategory(
      bookmark.id,
      bookmark.title,
      children,
    );
  }

  return new Folder(
    bookmark.id,
    bookmark.title,
    children,
  );
}


export async function getTree(): Promise<BookmarkRootCategory[]> {
  let bookmarks = [];

  if (chrome !== undefined && chrome.bookmarks !== undefined) {
    bookmarks = await new Promise((resolve) => chrome.bookmarks.getTree((data) => {
      resolve(data[0].children
        .map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark)));
    }));
  } else {
    bookmarks = (await browser.bookmarks.getTree())[0].children
      .map((bookmark) => normalizeBookmarkFromBrowserBookmark(bookmark));
  }

  return bookmarks as BookmarkRootCategory[];
}

export async function openBookmarkManager(): Promise<void> {
  if (chrome === undefined || chrome.tabs === undefined) {
    throw Error('This browser does not have bookmark manager.');
  }

  return new Promise((resolve) => chrome.tabs.create({
    url: 'chrome://bookmarks',
  }, () => resolve()));
}
