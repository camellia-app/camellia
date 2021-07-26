import { render } from 'react-dom';
import { BookmarkRootCategory } from './bookmarks/Bookmark';
import { getTree } from './bookmarks/BookmarkManager';
import { BackgroundMedia } from './components/BackgroundMedia/BackgroundMedia';
import { RandomUnsplashImage } from './components/BackgroundMedia/RandomUnsplashImage';
import { BookmarkBrowser } from './components/BookmarkBrowser/BookmarkBrowser';
import { BottomToolbar } from './components/BottomToolbar/BottomToolbar';

interface NewtabProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

export const Newtab = (props: NewtabProps) => (
  <>
    <BookmarkBrowser bookmarkCategories={props.bookmarkCategories} />
    <BottomToolbar />
    <BackgroundMedia>
      <RandomUnsplashImage />
    </BackgroundMedia>
  </>
);

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('Can not find #root element to initialize the app');
}

render(
  <Newtab bookmarkCategories={getTree()} />,
  root,
);
