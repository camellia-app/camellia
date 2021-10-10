import { Bookmark } from '../../bookmarks/Bookmark';
import { Reducer } from 'redux';

export enum BookmarkActionTypes {
  FETCH_BOOKMARKS = 'FETCH_BOOKMARKS',
  FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS',
}

export interface BookmarkState {
  bookmarks: Bookmark[];
  loaded: boolean;
}

export type BookmarkAction =
  | {
      type: BookmarkActionTypes.FETCH_BOOKMARKS;
    }
  | {
      payload: Bookmark[];
      type: BookmarkActionTypes.FETCH_BOOKMARKS_SUCCESS;
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
