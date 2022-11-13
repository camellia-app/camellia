import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRandomUnsplashPhotoFromCollection } from '../../api/unsplash';
import type { UnsplashPhoto } from '../../api/unsplash/common';

export type UnsplashState = {
  photo: UnsplashPhoto | undefined;
};

const initialState: UnsplashState = {
  photo: undefined,
};

export const getRandomPhotoFromCollectionThunk = createAsyncThunk(
  'unsplash/getRandomPhotoFromCollection',
  (collectionId: string) => {
    return getRandomUnsplashPhotoFromCollection(collectionId);
  },
);

export const unsplashSlice = createSlice({
  name: 'unsplash',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRandomPhotoFromCollectionThunk.fulfilled, (state, action) => {
      state.photo = action.payload;
    });
  },
});
