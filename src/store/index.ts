import { configureStore } from '@reduxjs/toolkit';
import { bookmarkSearchSlice } from './slice/bookmarkSearchSlice';
import { optionFiltersSlice } from './slice/optionFiltersSlice';
import { popupSlice } from './slice/popupSlice';
import { unsplashSlice } from './slice/unsplashSlice';

export const store = configureStore({
  reducer: {
    bookmarkSearch: bookmarkSearchSlice.reducer,
    popup: popupSlice.reducer,
    unsplash: unsplashSlice.reducer,
    activeOptionCategory: optionFiltersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
