import type { FC } from 'react';
import { useEffect } from 'react';
import { Popup } from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import bookmarkClasses from '../Bookmark/Bookmark.module.css';
import popupClasses from './Popup.module.css';
import type { PopupState } from '../../store/slice/popupSlice';
import { popupSlice } from '../../store/slice/popupSlice';
import type { RootState } from '../../store';

export const PopupManager: FC = () => {
  const popupsState = useSelector<RootState, PopupState>((state) => state.popup);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleBodyClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (popupsState.popupsStack.length === 0) {
        return;
      }

      const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmark}`) !== null;
      const isClickedOnPopup = event.target.closest(`.${popupClasses.popup}`) !== null;

      if (isClickedOnBookmarkItem || isClickedOnPopup) {
        return;
      }

      dispatch(popupSlice.actions.closeAllPopups());
    };

    const popupEscapeKeyPressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && popupsState.popupsStack.length > 0) {
        dispatch(popupSlice.actions.closeLastPopup());
      }
    };

    const screenResizeHandler = (): void => {
      if (popupsState.popupsStack.length > 0) {
        dispatch(popupSlice.actions.closeAllPopups());
      }
    };

    document.addEventListener('click', handleBodyClick);
    document.addEventListener('keydown', popupEscapeKeyPressHandler);
    window.addEventListener('resize', screenResizeHandler);

    return (): void => {
      document.removeEventListener('click', handleBodyClick);
      document.removeEventListener('keydown', popupEscapeKeyPressHandler);
      window.removeEventListener('resize', screenResizeHandler);
    };
  }, [dispatch, popupsState.popupsStack]);

  return (
    <>
      {popupsState.popupsStack.map((popupProps) => (
        <Popup
          bookmarks={popupProps.bookmarks}
          clickPosition={popupProps.clickPosition}
          id={popupProps.id}
          key={popupProps.id}
          nestingLevel={popupProps.nestingLevel}
          title={popupProps.title}
        />
      ))}
    </>
  );
};
