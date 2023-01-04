import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Bookmark } from '../../api/bookmark/common';

type PopupId = string;

type FolderPopup = {
  bookmarks: Array<Bookmark>;
  height?: number | undefined;
  id: PopupId;
  isPositionRecomputed: boolean;
  nestingLevel: number;
  placement: {
    x: number;
    y: number;
  };
  title: string;
};

export type FolderPopupsState = {
  popupsStack: Array<FolderPopup>;
};

const initialState: FolderPopupsState = {
  popupsStack: [],
};

export const folderPopupSlice = createSlice({
  name: 'folderPopup',
  initialState: initialState,
  reducers: {
    closeAllPopups: (state) => {
      state.popupsStack = [];
    },
    closeLastPopup: (state) => {
      state.popupsStack = state.popupsStack.slice(0, -1);
    },
    closePopup: (state, action: PayloadAction<number>) => {
      const popupIndex = action.payload;

      state.popupsStack = state.popupsStack.slice(0, popupIndex);
    },
    closeNextPopups: (state, action: PayloadAction<number>) => {
      const popupIndex = action.payload;

      if (state.popupsStack.length <= popupIndex + 1) {
        return;
      }

      state.popupsStack = state.popupsStack.slice(0, popupIndex + 1);
    },
    togglePopup: (state, action: PayloadAction<FolderPopup>) => {
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
      state.popupsStack = [...newStackFilteredByNestingLevel, action.payload];
    },
    repositionPopup: (
      state,
      action: PayloadAction<{
        height: number | undefined;
        popupIndex: number;
        x: number;
        y: number;
      }>,
    ) => {
      const popup = state.popupsStack.at(action.payload.popupIndex);

      if (popup === undefined) {
        return;
      }

      popup.height = action.payload.height;
      popup.placement.x = action.payload.x;
      popup.placement.y = action.payload.y;
      popup.isPositionRecomputed = true;
    },
  },
});
