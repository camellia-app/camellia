import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export async function getTree(): Promise<BookmarkTreeNode[]> {
  if (process.env.TARGET_PLATFORM === 'chrome') {
    return new Promise((resolve) => chrome.bookmarks.getTree((data) => { resolve(data); }));
  }

  return browser.bookmarks.getTree();
}

export function getFaviconUrl(url: string): string {
  return `chrome://favicon/size/16@${window.devicePixelRatio}x/${url}`;
}
