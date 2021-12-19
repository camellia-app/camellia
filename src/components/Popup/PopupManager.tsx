import type { VoidFunctionComponent } from 'react';
import { useEffect } from 'react';
import { Popup } from './Popup';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/reducers';
import type { PopupState } from '../../store/reducers/popupReducer';
import bookmarkClasses from '../Bookmark/Bookmark.module.css';
import popupClasses from './Popup.module.css';
import { closeAllPopups, closeLastPopup } from '../../store/actionCreators/popup';

export const PopupManager: VoidFunctionComponent = () => {
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

      const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;
      const isClickedOnPopup = event.target.closest(`.${popupClasses.popup}`) !== null;

      if (isClickedOnBookmarkItem || isClickedOnPopup) {
        return;
      }

      dispatch(closeAllPopups());
    };

    const popupEscapeKeyPressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && popupsState.popupsStack.length > 0) {
        dispatch(closeLastPopup());
      }
    };

    const screenResizeHandler = (): void => {
      if (popupsState.popupsStack.length > 0) {
        dispatch(closeAllPopups());
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
