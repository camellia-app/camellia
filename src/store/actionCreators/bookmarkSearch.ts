import type { Dispatch } from 'redux';
import type { BookmarkSearchAction } from '../reducers/bookmarkSearchReducer';
import { BookmarkSearchActionTypes } from '../reducers/bookmarkSearchReducer';
import { searchBookmarks } from '../../api/bookmark';

export const search = (searchQuery: string) => {
  return async (dispatch: Dispatch<BookmarkSearchAction>): Promise<void> => {
    const bookmarks = await searchBookmarks(searchQuery);

    dispatch({
      type: BookmarkSearchActionTypes.SEARCH,
      payload: {
        bookmarks: bookmarks,
        searchQuery: searchQuery,
      },
    });
  };
};

export const closeSearch = () => {
  return async (dispatch: Dispatch<BookmarkSearchAction>): Promise<void> => {
    dispatch({
      type: BookmarkSearchActionTypes.CLOSE_SEARCH,
    });
  };
};
