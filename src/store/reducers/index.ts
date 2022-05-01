import { combineReducers } from 'redux';
import { popupReducer } from './popupReducer';
import { bookmarkSearchReducer } from './bookmarkSearchReducer';

export const rootReducer = combineReducers({
  bookmarkSearch: bookmarkSearchReducer,
  popup: popupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
