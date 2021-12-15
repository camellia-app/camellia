import type { Reducer } from 'redux';
import type { Bookmark } from '../../bookmarkManager/bookmark';

export enum BookmarkActionTypes {
  FETCH_BOOKMARKS = 'FETCH_BOOKMARKS',
  FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS',
}

export type BookmarkState = {
  bookmarks: Array<Bookmark>;
  loaded: boolean;
};

export type BookmarkAction =
  | {
      payload: Array<Bookmark>;
      type: BookmarkActionTypes.FETCH_BOOKMARKS_SUCCESS;
    }
  | {
      type: BookmarkActionTypes.FETCH_BOOKMARKS;
    };

const initialState: BookmarkState = {
  bookmarks: [],
  loaded: false,
};

export const bookmarkReducer: Reducer<BookmarkState, BookmarkAction> = (state = initialState, action) => {
  switch (action.type) {
    case BookmarkActionTypes.FETCH_BOOKMARKS:
      return {
        ...state,
        loaded: false,
      };

    case BookmarkActionTypes.FETCH_BOOKMARKS_SUCCESS:
      return {
        ...state,
        loaded: true,
        bookmarks: action.payload,
      };

    default:
      return state;
  }
};
