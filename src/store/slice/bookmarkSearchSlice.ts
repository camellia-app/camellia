import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Bookmark } from '../../api/bookmark/common';
import { searchBookmarks } from '../../api/bookmark';

export type BookmarkSearchState = {
  bookmarks: Array<Bookmark>;
  isActive: boolean;
  searchQuery: string;
};

const initialState: BookmarkSearchState = {
  bookmarks: [],
  searchQuery: '',
  isActive: false,
};

export const searchBookmarksThunk = createAsyncThunk('bookmarks/search', async (searchQuery: string) => {
  return {
    bookmarks: await searchBookmarks(searchQuery),
    searchQuery: searchQuery,
  };
});

export const bookmarkSearchSlice = createSlice({
  name: 'bookmarkSearch',
  initialState,
  reducers: {
    closeSearch: (state) => {
      state.isActive = false;
      state.bookmarks = [];
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBookmarksThunk.fulfilled, (state, action) => {
      state.isActive = true;
      state.bookmarks = action.payload.bookmarks;
      state.searchQuery = action.payload.searchQuery;
    });
  },
});
