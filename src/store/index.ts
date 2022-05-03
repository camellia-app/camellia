import { configureStore } from '@reduxjs/toolkit';
import { bookmarkSearchSlice } from './slice/bookmarkSearchSlice';
import { popupSlice } from './slice/popupSlice';

export const store = configureStore({
  reducer: {
    bookmarkSearch: bookmarkSearchSlice.reducer,
    popup: popupSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
