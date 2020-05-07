import * as Sentry from '@sentry/browser';
import {
  Component, Fragment, h, render, VNode,
} from 'preact';
import { getTree } from './bookmarks/BookmarkManager';
import BookmarkBrowser from './components/BookmarkBrowser/BookmarkBrowser';
import BookmarkRootCategory from './bookmarks/BookmarkRootCategory';
import BottomToolbar from './components/BottomToolbar/BottomToolbar';
import RandomUnsplashImage from './components/BackgroundMedia/RandomUnsplashImage';
import AnimatedGradient from './components/BackgroundMedia/AnimatedGradient';

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
  background: VNode;
}

export default class Newtab extends Component<NewtabProps, NewtabState> {
  loadFallbackBackground = () => {
    this.setState({
      background: <AnimatedGradient />,
    });
  };

  state = {
    background: <RandomUnsplashImage imageLoadingFailureHandler={this.loadFallbackBackground} />,
  };

  render(props: NewtabProps, state: NewtabState) {
    return (
      <Fragment>
        <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
        <BottomToolbar />
        { state.background }
      </Fragment>
    );
  }
}

render(
  <Newtab bookmarkCategories={getTree()} />,
  document.querySelector('#root'),
);
