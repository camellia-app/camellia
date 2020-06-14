import * as Sentry from '@sentry/browser';
import {
  Fragment, h, render,
} from 'preact';
import { BookmarkRootCategory } from './bookmarks/Bookmark';
import { getTree } from './bookmarks/BookmarkManager';
import { BackgroundMedia } from './components/BackgroundMedia/BackgroundMedia';
import { RandomUnsplashImage } from './components/BackgroundMedia/RandomUnsplashImage';
import { BookmarkBrowser } from './components/BookmarkBrowser/BookmarkBrowser';
import { BottomToolbar } from './components/BottomToolbar/BottomToolbar';

Sentry.init({
  debug: process.env.APP_ENV !== 'stable',
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: process.env.GIT_VERSION,
});

if (process.env.TARGET_PLATFORM !== undefined) {
  Sentry.setTag('build_platform', process.env.TARGET_PLATFORM);
}

if (process.env.BUILD_NUMBER !== undefined) {
  Sentry.setTag('build_number', process.env.BUILD_NUMBER);
}

interface NewtabProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

export const Newtab = (props: NewtabProps) => (
  <Fragment>
    <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
    <BottomToolbar />
    <BackgroundMedia>
      <RandomUnsplashImage />
    </BackgroundMedia>
  </Fragment>
);

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('Can not find #root element to initialize the app');
}

render(
  <Newtab bookmarkCategories={getTree()} />,
  root,
);
