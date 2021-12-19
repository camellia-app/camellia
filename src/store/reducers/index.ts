import { bookmarkReducer } from './bookmarkReducer';
import { combineReducers } from 'redux';
import { bookmarkSearchReducer } from './bookmarkSearchReducer';
import { popupReducer } from './popupReducer';

export const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
  bookmarkSearch: bookmarkSearchReducer,
  popup: popupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
