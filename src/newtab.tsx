import {
  Component, Fragment, h, render,
} from 'preact';
import { getTree } from './BrowserAPI/Bookmark';
import BookmarkBrowser from './components/BookmarkBrowser/BookmarkBrowser';
import BackgroundImage from './components/BackgroundMedia/BackgroundImage';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface AppProps {
  rootBookmarkTree: Promise<BookmarkTreeNode[]>;
}

export interface AppState {
}

export default class App extends Component<AppProps, AppState> {
  render() {
    return (
      <Fragment>
        <BookmarkBrowser bookmarkCategories={getTree()} />
        <BackgroundImage url="https://source.unsplash.com/1920x1080/?dark" />
      </Fragment>
    );
  }
}

render(
  <App rootBookmarkTree={getTree()} />,
  document.querySelector('#root'),
);
