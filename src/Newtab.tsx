import * as Sentry from '@sentry/browser';
import {
  Component, Fragment, h, render,
} from 'preact';
import { getTree } from './bookmarks/BookmarkManager';
import BookmarkBrowser from './components/BookmarkBrowser/BookmarkBrowser';
import BackgroundImage from './components/BackgroundMedia/BackgroundImage';
import BookmarkRootCategory from './bookmarks/BookmarkRootCategory';
import BottomToolbar from './components/BottomToolbar/BottomToolbar';

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
    const pixelRatio = window.devicePixelRatio;

    const realWidth = Math.round(window.screen.width * pixelRatio);
    const realHeight = Math.round(window.screen.height * pixelRatio);

    return (
      <Fragment>
        <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
        <BottomToolbar />
        <BackgroundImage url={`https://source.unsplash.com/${realWidth}x${realHeight}/?dark`} />
      </Fragment>
    );
  }
}

render(
  <Newtab bookmarkCategories={getTree()} />,
  document.querySelector('#root'),
);
