import type { VoidFunctionComponent } from 'react';
import { useEffect } from 'react';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import s from './BookmarkBrowser.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/reducers';
import type { BookmarkState } from '../../store/reducers/bookmarkReducer';
import { isFolder } from '../../bookmarkManager/bookmark';
import { fetchBookmarks } from '../../store/actionCreators/bookmark';
import type { BookmarkSearchState } from '../../store/reducers/bookmarkSearchReducer';
import cn from 'classnames';

export const BookmarkBrowser: VoidFunctionComponent = () => {
  const bookmarkState = useSelector<RootState, BookmarkState>((state) => state.bookmark);
  const bookmarkSearchState = useSelector<RootState, BookmarkSearchState>((state) => state.bookmarkSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  if (bookmarkSearchState.show && bookmarkState.bookmarks.length === 0) {
    return <p className={s.noBookmarksMessage}>Nothing found by your search query</p>;
  }

  if (bookmarkState.loaded && bookmarkState.bookmarks.length === 0) {
    return <p className={s.noBookmarksMessage}>Add your first bookmarks to get started with Camellia</p>;
  }

  return (
    <div
      className={cn(s.bookmarkBrowser, {
        [s.bookmarkBrowserCentered]: true,
      })}
    >
      {bookmarkState.bookmarks.filter(isFolder).map((item) => (
        <BookmarkCategory bookmarks={item.children} categoryTitle={item.title} key={item.idLocal} />
      ))}
    </div>
  );
};
