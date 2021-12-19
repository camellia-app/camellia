import type { Dispatch } from 'redux';
import type { PopupAction, OpenedPopup, PopupId } from '../reducers/popupReducer';
import { PopupActionTypes } from '../reducers/popupReducer';

export const closeAllPopups = () => {
  return async (dispatch: Dispatch<PopupAction>): Promise<void> => {
    dispatch({
      type: PopupActionTypes.CLOSE_ALL_POPUPS,
    });
  };
};

export const closeLastPopup = () => {
  return async (dispatch: Dispatch<PopupAction>): Promise<void> => {
    dispatch({
      type: PopupActionTypes.CLOSE_LAST_POPUP,
    });
  };
};

export const closePopup = (id: PopupId) => {
  return async (dispatch: Dispatch<PopupAction>): Promise<void> => {
    dispatch({
      type: PopupActionTypes.CLOSE_POPUP,
      payload: {
        id: id,
      },
    });
  };
};

export const togglePopup = (popup: OpenedPopup) => {
  return async (dispatch: Dispatch<PopupAction>): Promise<void> => {
    dispatch({
      type: PopupActionTypes.TOGGLE_POPUP,
      payload: popup,
    });
  };
};
