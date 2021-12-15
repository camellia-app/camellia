import type { Dispatch } from 'redux';
import type { FolderPopupAction, OpenedFolderPopup } from '../reducers/folderPopupReducer';
import { FolderPopupActionTypes } from '../reducers/folderPopupReducer';
import type { Folder } from '../../bookmarkManager/bookmark';

export const closeAllPopups = () => {
  return async (dispatch: Dispatch<FolderPopupAction>): Promise<void> => {
    dispatch({
      type: FolderPopupActionTypes.CLOSE_ALL_POPUPS,
    });
  };
};

export const closeLastPopup = () => {
  return async (dispatch: Dispatch<FolderPopupAction>): Promise<void> => {
    dispatch({
      type: FolderPopupActionTypes.CLOSE_LAST_POPUP,
    });
  };
};

export const closeAllNextPopups = (folder: Folder) => {
  return async (dispatch: Dispatch<FolderPopupAction>): Promise<void> => {
    dispatch({
      type: FolderPopupActionTypes.CLOSE_ALL_NEXT_POPUPS,
      payload: folder,
    });
  };
};

export const closePopup = (folder: Folder) => {
  return async (dispatch: Dispatch<FolderPopupAction>): Promise<void> => {
    dispatch({
      type: FolderPopupActionTypes.CLOSE_POPUP,
      payload: folder,
    });
  };
};

export const togglePopup = (popupProps: OpenedFolderPopup) => {
  return async (dispatch: Dispatch<FolderPopupAction>): Promise<void> => {
    dispatch({
      type: FolderPopupActionTypes.TOGGLE_POPUP,
      payload: popupProps,
    });
  };
};
