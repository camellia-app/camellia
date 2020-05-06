import * as Sentry from '@sentry/browser';
import {
  Component, Fragment, h, render,
} from 'preact';
import { getTree } from './bookmarks/BookmarkManager';
import BookmarkBrowser from './components/BookmarkBrowser/BookmarkBrowser';
import BookmarkRootCategory from './bookmarks/BookmarkRootCategory';
import BottomToolbar from './components/BottomToolbar/BottomToolbar';
import RandomUnsplashImage from './components/BackgroundMedia/RandomUnsplashImage';

Sentry.init({
  debug: process.env.APP_ENV !== 'stable',
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: process.env.GIT_VERSION,
});

export interface NewtabProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

export interface NewtabState {
}

export default class Newtab extends Component<NewtabProps, NewtabState> {
  render(props: NewtabProps, state: NewtabState) {
    return (
      <Fragment>
        <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
        <BottomToolbar />
        <RandomUnsplashImage />
      </Fragment>
    );
  }
}

render(
  <Newtab bookmarkCategories={getTree()} />,
  document.querySelector('#root'),
);
