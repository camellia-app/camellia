import { Reducer } from 'redux';
import { FolderPopupProps } from '../../components/FolderPopup/FolderPopup';
import { Folder } from '../../bookmarkManager/bookmark';

export enum FolderPopupActionTypes {
  CLOSE_ALL_NEXT_POPUPS = 'CLOSE_ALL_NEXT_POPUPS',
  CLOSE_ALL_POPUPS = 'CLOSE_ALL_POPUPS',
  CLOSE_LAST_POPUP = 'CLOSE_LAST_POPUP',
  CLOSE_POPUP = 'CLOSE_POPUP',
  TOGGLE_POPUP = 'TOGGLE_POPUP',
}

export interface FolderPopupState {
  popupsStack: FolderPopupProps[];
}

export type FolderPopupAction =
  | {
      payload: FolderPopupProps;
      type: FolderPopupActionTypes.TOGGLE_POPUP;
    }
  | {
      type: FolderPopupActionTypes.CLOSE_ALL_POPUPS;
    }
  | {
      payload: Folder;
      type: FolderPopupActionTypes.CLOSE_ALL_NEXT_POPUPS;
    }
  | {
      payload: Folder;
      type: FolderPopupActionTypes.CLOSE_POPUP;
    }
  | {
      type: FolderPopupActionTypes.CLOSE_LAST_POPUP;
    };

const initialState: FolderPopupState = {
  popupsStack: [],
};

export const folderPopupReducer: Reducer<FolderPopupState, FolderPopupAction> = (state = initialState, action) => {
  switch (action.type) {
    case FolderPopupActionTypes.CLOSE_ALL_POPUPS:
      return {
        popupsStack: [],
      };

    case FolderPopupActionTypes.CLOSE_ALL_NEXT_POPUPS:
      return {
        popupsStack: state.popupsStack.filter((popup) => popup.folder.nestingLevel <= action.payload.nestingLevel),
      };

    case FolderPopupActionTypes.CLOSE_POPUP:
      return {
        popupsStack: state.popupsStack.filter((popup) => popup.folder.nestingLevel < action.payload.nestingLevel),
      };

    case FolderPopupActionTypes.CLOSE_LAST_POPUP:
      return {
        popupsStack: state.popupsStack.slice(0, -1),
      };

    case FolderPopupActionTypes.TOGGLE_POPUP: {
      const indexOfOpenedPopupInStack = state.popupsStack.findIndex(
        (popup) => popup.folder.idLocal === action.payload.folder.idLocal,
      );

      const isThisPopupAlreadyOpened = indexOfOpenedPopupInStack !== -1;

      const newStack = state.popupsStack.filter(
        (popup) => popup.folder.nestingLevel < action.payload.folder.nestingLevel,
      );

      if (isThisPopupAlreadyOpened) {
        return {
          popupsStack: newStack,
        };
      }

      return {
        popupsStack: newStack.concat([action.payload]),
      };
    }

    default:
      return state;
  }
};
