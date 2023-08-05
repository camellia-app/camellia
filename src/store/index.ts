import { configureStore } from '@reduxjs/toolkit';

import { bookmarkSearchSlice } from './slice/bookmarkSearchSlice';
import { folderPopupSlice } from './slice/folderPopupSlice';
import { optionFiltersSlice } from './slice/optionFiltersSlice';
import { unsplashSlice } from './slice/unsplashSlice';

export const store = configureStore({
  reducer: {
    activeOptionCategory: optionFiltersSlice.reducer,
    bookmarkSearch: bookmarkSearchSlice.reducer,
    folderPopup: folderPopupSlice.reducer,
    unsplash: unsplashSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
