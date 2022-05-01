import type { Reducer } from 'redux';
import type { Bookmark } from '../../api/bookmark/common';

export enum PopupActionTypes {
  CLOSE_ALL_POPUPS = 'CLOSE_ALL_POPUPS',
  CLOSE_LAST_POPUP = 'CLOSE_LAST_POPUP',
  CLOSE_POPUP = 'CLOSE_POPUP',
  TOGGLE_POPUP = 'TOGGLE_POPUP',
}

export type PopupId = string;

export type OpenedPopup = {
  bookmarks: Array<Bookmark>;
  clickPosition: ClickPosition;
  id: PopupId;
  nestingLevel: number;
  title: string;
};

export type ClickPosition = {
  x: number;
  y: number;
};

export type PopupState = {
  popupsStack: Array<OpenedPopup>;
};

export type PopupAction =
  | {
      payload: {
        id: PopupId;
      };
      type: PopupActionTypes.CLOSE_POPUP;
    }
  | {
      payload: OpenedPopup;
      type: PopupActionTypes.TOGGLE_POPUP;
    }
  | {
      type: PopupActionTypes.CLOSE_ALL_POPUPS;
    }
  | {
      type: PopupActionTypes.CLOSE_LAST_POPUP;
    };

const initialState: PopupState = {
  popupsStack: [],
};

export const popupReducer: Reducer<PopupState, PopupAction> = (state = initialState, action) => {
  switch (action.type) {
    case PopupActionTypes.CLOSE_ALL_POPUPS:
      return {
        popupsStack: [],
      };

    case PopupActionTypes.CLOSE_POPUP: {
      const popupIndex = state.popupsStack.findIndex((popup) => popup.id === action.payload.id);

      return {
        popupsStack: state.popupsStack.slice(0, popupIndex),
      };
    }

    case PopupActionTypes.CLOSE_LAST_POPUP:
      return {
        popupsStack: state.popupsStack.slice(0, -1),
      };

    case PopupActionTypes.TOGGLE_POPUP: {
      const newStackFilteredByNestingLevel = state.popupsStack.filter(
        (popup) => popup.nestingLevel < action.payload.nestingLevel,
      );

      const indexOfOpenedPopupInStack = state.popupsStack.findIndex((popup) => popup.id === action.payload.id);

      const isThisPopupAlreadyOpened = indexOfOpenedPopupInStack !== -1;

      // if popup with same id is opened, close it wil all following popups
      if (isThisPopupAlreadyOpened) {
        return {
          popupsStack: newStackFilteredByNestingLevel.slice(0, indexOfOpenedPopupInStack),
        };
      }

      // if popup with same id is NOT opened, add it to the end of the stack
      return {
        popupsStack: newStackFilteredByNestingLevel.concat([action.payload]),
      };
    }

    default:
      return state;
  }
};
