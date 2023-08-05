import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { Bookmark } from '../../api/bookmark/common';

export type BookmarkSearchState = {
  bookmarks: Array<Bookmark>;
  isActive: boolean;
};

const initialState: BookmarkSearchState = {
  bookmarks: [],
  isActive: false,
};

export const bookmarkSearchSlice = createSlice({
  initialState,
  name: 'bookmarkSearch',
  reducers: {
    toggleSearch: (state, payload: PayloadAction<boolean>) => {
      state.isActive = payload.payload;
    },
    updateSearchResults: (state, payload: PayloadAction<Array<Bookmark>>) => {
      state.bookmarks = payload.payload;
    },
  },
});
