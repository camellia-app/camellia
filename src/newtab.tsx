import { Component, h, render } from 'preact';
import { getTree } from './BrowserAPI/Bookmark';
import BookmarkBrowser from './components/BookmarkBrowser/BookmarkBrowser';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface AppProps {
  rootBookmarkTree: Promise<BookmarkTreeNode[]>;
}

export interface AppState {
}

export default class App extends Component<AppProps, AppState> {
  render() {
    return (
      <BookmarkBrowser bookmarkCategories={getTree()} />
    );
  }
}

render(
  <App rootBookmarkTree={getTree()} />,
  document.querySelector('#root'),
);
