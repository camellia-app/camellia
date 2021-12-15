import type { VoidFunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/reducers';
import type { BookmarkState } from '../../store/reducers/bookmarkReducer';
import cn from 'classnames';
import s from './BookmarkWorkspace.module.css';
import { BookmarkSearch } from '../BookmarkSearch/BookmarkSearch';
import { BookmarkBrowser } from '../BookmarkBrowser/BookmarkBrowser';
import { FolderPopupManager } from '../FolderPopup/FolderPopupManager';

export const BookmarkWorkspace: VoidFunctionComponent = () => {
  const bookmarkState = useSelector<RootState, BookmarkState>((state) => state.bookmark);

  const mainClasses = cn(s.bookmarkWorkspace, {
    [s.loading]: !bookmarkState.loaded,
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <main className={mainClasses}>
      <BookmarkSearch />
      <BookmarkBrowser />
      <FolderPopupManager />
    </main>
  );
};