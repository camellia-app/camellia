import type { Reducer } from 'redux';
import type { Bookmark } from '../../api/bookmark/common';

export enum BookmarkSearchActionTypes {
  CLOSE_SEARCH = 'CLOSE_SEARCH',
  SEARCH = 'SEARCH',
}

export type BookmarkSearchState = {
  bookmarks: Array<Bookmark>;
  isActive: boolean;
  searchQuery: string;
};

export type BookmarkSearchAction =
  | {
      payload: {
        bookmarks: Array<Bookmark>;
        searchQuery: string;
      };
      type: BookmarkSearchActionTypes.SEARCH;
    }
  | {
      type: BookmarkSearchActionTypes.CLOSE_SEARCH;
    };

const initialState: BookmarkSearchState = {
  bookmarks: [],
  searchQuery: '',
  isActive: false,
};

export const bookmarkSearchReducer: Reducer<BookmarkSearchState, BookmarkSearchAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case BookmarkSearchActionTypes.SEARCH:
      return {
        isActive: true,
        bookmarks: action.payload.bookmarks,
        searchQuery: action.payload.searchQuery,
      };

    case BookmarkSearchActionTypes.CLOSE_SEARCH:
      return {
        isActive: false,
        bookmarks: [],
        searchQuery: '',
      };

    default:
      return state;
  }
};
