import { Dispatch } from 'redux';
import { FolderPopupAction, FolderPopupActionTypes } from '../reducers/folderPopupReducer';
import { Folder } from '../../bookmarks/Bookmark';
import { FolderPopupProps } from '../../components/FolderPopup/FolderPopup';

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

export const togglePopup = (popupProps: FolderPopupProps) => {
  return async (dispatch: Dispatch<FolderPopupAction>): Promise<void> => {
    dispatch({
      type: FolderPopupActionTypes.TOGGLE_POPUP,
      payload: popupProps,
    });
  };
};
