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
  initialState,
  name: 'unsplash',
  reducers: {
    updatePhoto: (state, payload: PayloadAction<UnsplashPhoto>) => {
      state.photo = payload.payload;
    },
  },
});
