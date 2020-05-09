import * as Sentry from '@sentry/browser';
import {
  Fragment, h, render,
} from 'preact';
import { getTree } from './bookmarks/BookmarkManager';
import { BookmarkBrowser } from './components/BookmarkBrowser/BookmarkBrowser';
import { BottomToolbar } from './components/BottomToolbar/BottomToolbar';
import { RandomUnsplashImage } from './components/BackgroundMedia/RandomUnsplashImage';
import { BackgroundMedia } from './components/BackgroundMedia/BackgroundMedia';
import { BookmarkRootCategory } from './bookmarks/Bookmark';

Sentry.init({
  debug: process.env.APP_ENV !== 'stable',
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: process.env.GIT_VERSION,
});

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

render(
  <Newtab bookmarkCategories={getTree()} />,
  document.querySelector('#root'),
);
