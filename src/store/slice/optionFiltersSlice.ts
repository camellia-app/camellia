import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export type OptionFiltersState = {
  activeCategoryId: string | undefined;
};

const initialState: OptionFiltersState = {
  activeCategoryId: undefined,
};

export const optionFiltersSlice = createSlice({
  initialState,
  name: 'optionFilters',
  reducers: {
    changeCategory: (state, action: PayloadAction<string | undefined>) => {
      state.activeCategoryId = action.payload;
    },
  },
});
