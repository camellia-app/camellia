import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UnsplashPhoto } from '../../api/unsplash/common';

export type UnsplashState = {
  photo: UnsplashPhoto | undefined;
};

const initialState: UnsplashState = {
  photo: undefined,
};

export const unsplashSlice = createSlice({
  name: 'unsplash',
  initialState,
  reducers: {
    updatePhoto: (state, payload: PayloadAction<UnsplashPhoto>) => {
      state.photo = payload.payload;
    },
  },
});
