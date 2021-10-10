import { Reducer } from 'redux';

export enum BookmarkSearchActionTypes {
  CLOSE_SEARCH = 'CLOSE_SEARCH',
  OPEN_SEARCH = 'OPEN_SEARCH',
}

export interface BookmarkSearchState {
  initialSearchQuery: string;
  show: boolean;
}

export type BookmarkSearchAction =
  | {
      payload: string;
      type: BookmarkSearchActionTypes.OPEN_SEARCH;
    }
  | {
      type: BookmarkSearchActionTypes.CLOSE_SEARCH;
    };

const initialState: BookmarkSearchState = {
  initialSearchQuery: '',
  show: false,
};

export const bookmarkSearchReducer: Reducer<BookmarkSearchState, BookmarkSearchAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case BookmarkSearchActionTypes.OPEN_SEARCH:
      return {
        show: true,
        initialSearchQuery: action.payload,
      };

    case BookmarkSearchActionTypes.CLOSE_SEARCH:
      return {
        show: false,
        initialSearchQuery: '',
      };

    default:
      return state;
  }
};
