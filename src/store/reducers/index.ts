import { bookmarkReducer } from './bookmarkReducer';
import { combineReducers } from 'redux';
import { bookmarkSearchReducer } from './bookmarkSearchReducer';
import { folderPopupReducer } from './folderPopupReducer';

export const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
  bookmarkSearch: bookmarkSearchReducer,
  folderPopup: folderPopupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
