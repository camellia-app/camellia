import { useEffect, VoidFunctionComponent } from 'react';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import s from './BookmarkBrowser.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { BookmarkState } from '../../store/reducers/bookmarkReducer';
import { isFolder } from '../../bookmarks/Bookmark';
import { fetchBookmarks } from '../../store/actionCreators/bookmark';
import { BookmarkSearchState } from '../../store/reducers/bookmarkSearchReducer';

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
    <>
      {bookmarkState.bookmarks.filter(isFolder).map((item) => (
        <BookmarkCategory key={item.idLocal} bookmarks={item.children} categoryTitle={item.title} />
      ))}
    </>
  );
};
