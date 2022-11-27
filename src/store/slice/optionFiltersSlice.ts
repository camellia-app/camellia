import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type OptionFiltersState = {
  activeCategoryId: string | undefined;
};

const initialState: OptionFiltersState = {
  activeCategoryId: undefined,
};

export const optionFiltersSlice = createSlice({
  name: 'optionFilters',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string | undefined>) => {
      state.activeCategoryId = action.payload;
    },
  },
});
