import type { Dispatch } from 'redux';
import type { BookmarkSearchAction } from '../reducers/bookmarkSearchReducer';
import { BookmarkSearchActionTypes } from '../reducers/bookmarkSearchReducer';

export const openSearch = (initialQuery: string) => {
  return async (dispatch: Dispatch<BookmarkSearchAction>): Promise<void> => {
    dispatch({
      type: BookmarkSearchActionTypes.OPEN_SEARCH,
      payload: initialQuery,
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
