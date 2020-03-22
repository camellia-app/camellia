import {
  Component, Fragment, h, render,
} from 'preact';
import { getTree } from './bookmarks/BookmarkManager';
import BookmarkBrowser from './components/BookmarkBrowser/BookmarkBrowser';
import BackgroundImage from './components/BackgroundMedia/BackgroundImage';
import BookmarkRootCategory from './bookmarks/BookmarkRootCategory';

export interface AppProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

export interface AppState {
}

export default class App extends Component<AppProps, AppState> {
  render(props: AppProps) {
    return (
      <Fragment>
        <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
        <BackgroundImage url="https://source.unsplash.com/1920x1080/?dark" />
      </Fragment>
    );
  }
}

render(
  <App bookmarkCategories={getTree()} />,
  document.querySelector('#root'),
);
