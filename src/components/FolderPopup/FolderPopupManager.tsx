import type { VoidFunctionComponent } from 'react';
import { useEffect } from 'react';
import { FolderPopup } from './FolderPopup';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/reducers';
import type { FolderPopupState } from '../../store/reducers/folderPopupReducer';
import bookmarkClasses from '../Bookmark/Bookmark.module.css';
import folderPopupClasses from './FolderPopup.module.css';
import { closeAllPopups, closeLastPopup } from '../../store/actionCreators/folderPopup';

export const FolderPopupManager: VoidFunctionComponent = () => {
  const folderPopupsState = useSelector<RootState, FolderPopupState>((state) => state.folderPopup);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleBodyClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (folderPopupsState.popupsStack.length === 0) {
        return;
      }

      const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;
      const isClickedOnFolderPopup = event.target.closest(`.${folderPopupClasses.folderPopup}`) !== null;

      if (isClickedOnBookmarkItem || isClickedOnFolderPopup) {
        return;
      }

      dispatch(closeAllPopups());
    };

    const popupEscapeKeyPressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && folderPopupsState.popupsStack.length > 0) {
        dispatch(closeLastPopup());
      }
    };

    const screenResizeHandler = (): void => {
      if (folderPopupsState.popupsStack.length > 0) {
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
  }, [dispatch, folderPopupsState.popupsStack]);

  return (
    <>
      {folderPopupsState.popupsStack.map((folderPopupsProps) => (
        <FolderPopup
          clickPosition={folderPopupsProps.clickPosition}
          folder={folderPopupsProps.folder}
          key={folderPopupsProps.folder.idLocal}
        />
      ))}
    </>
  );
};
