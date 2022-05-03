import type { Bookmark } from '../../api/bookmark/common';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type PopupId = string;

export type ClickPosition = {
  x: number;
  y: number;
};

export type OpenedPopup = {
  bookmarks: Array<Bookmark>;
  clickPosition: ClickPosition;
  id: PopupId;
  nestingLevel: number;
  title: string;
};

export type PopupState = {
  popupsStack: Array<OpenedPopup>;
};

const initialState: PopupState = {
  popupsStack: [],
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    closeAllPopups: (state) => {
      state.popupsStack = [];
    },
    closeLastPopup: (state) => {
      state.popupsStack = state.popupsStack.slice(0, -1);
    },
    closePopup: (state, action: PayloadAction<string>) => {
      const popupIndex = state.popupsStack.findIndex((popup) => popup.id === action.payload);

      state.popupsStack = state.popupsStack.slice(0, popupIndex);
    },
    togglePopup: (state, action: PayloadAction<OpenedPopup>) => {
      const newStackFilteredByNestingLevel = state.popupsStack.filter(
        (popup) => popup.nestingLevel < action.payload.nestingLevel,
      );

      const indexOfOpenedPopupInStack = state.popupsStack.findIndex((popup) => popup.id === action.payload.id);

      const isThisPopupAlreadyOpened = indexOfOpenedPopupInStack !== -1;

      // if popup with same id is opened, close it with all following popups
      if (isThisPopupAlreadyOpened) {
        state.popupsStack = newStackFilteredByNestingLevel.slice(0, indexOfOpenedPopupInStack);

        return;
      }

      // if popup with same id is NOT opened, add it to the end of the stack
      state.popupsStack = newStackFilteredByNestingLevel.concat([action.payload]);
    },
  },
});
