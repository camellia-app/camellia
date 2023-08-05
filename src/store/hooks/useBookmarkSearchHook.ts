import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Bookmark } from '../../api/bookmark/common';
import type { RootState } from '../index';
import type { BookmarkSearchState } from '../slice/bookmarkSearchSlice';

import { searchBookmarks } from '../../api/bookmark';
import { bookmarkSearchSlice } from '../slice/bookmarkSearchSlice';

type SearchDispatcher = (searchQuery: string) => void;
type SearchToggleDispatcher = (isActive: boolean) => void;

export const useBookmarkSearch = (): [boolean, Array<Bookmark>, SearchToggleDispatcher, SearchDispatcher] => {
  const bookmarkSearchState = useSelector<RootState, BookmarkSearchState>((state) => state.bookmarkSearch);

  const dispatch = useDispatch();

  const toggleSearchDispatcher = useCallback(
    (isActive: boolean): void => {
      dispatch(bookmarkSearchSlice.actions.toggleSearch(isActive));
    },
    [dispatch],
  );

  const searchBookmarksDispatcher = useCallback(
    (searchQuery: string): void => {
      searchBookmarks(searchQuery).then((bookmarks) => {
        dispatch(bookmarkSearchSlice.actions.updateSearchResults(bookmarks));
      });
    },
    [dispatch],
  );

  return [
    bookmarkSearchState.isActive,
    bookmarkSearchState.bookmarks,
    toggleSearchDispatcher,
    searchBookmarksDispatcher,
  ];
};
