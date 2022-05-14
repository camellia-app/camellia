import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Popup } from '../Popup';
import { useDispatch, useSelector } from 'react-redux';
import type { PopupState } from '../../../store/slice/popupSlice';
import { popupSlice } from '../../../store/slice/popupSlice';
import type { RootState } from '../../../store';
import { ChipList } from '../../ChipList/ChipList';
import { Bookmark } from '../../Bookmark/Bookmark';
import s from './PopupManager.module.css';

export const PopupManager: FC = () => {
  const popupsState = useSelector<RootState, PopupState>((state) => state.popup);

  const dispatch = useDispatch();

  const popupManagerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const popupEscapeKeyPressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        dispatch(popupSlice.actions.closeLastPopup());
      }
    };

    const screenResizeHandler = (): void => {
      dispatch(popupSlice.actions.closeAllPopups());
    };

    document.addEventListener('keydown', popupEscapeKeyPressHandler);
    window.addEventListener('resize', screenResizeHandler);

    return (): void => {
      document.removeEventListener('keydown', popupEscapeKeyPressHandler);
      window.removeEventListener('resize', screenResizeHandler);
    };
  }, [dispatch]);

  return (
    <div className={s.popupManager} ref={popupManagerRef}>
      {popupsState.popupsStack.map((popupProps) => {
        let popupChildren: ReactNode | undefined;

        switch (popupProps.content.type) {
          case 'bookmarkList':
            popupChildren = (
              <ChipList
                chips={popupProps.content.bookmarks.map((bookmark, index) => (
                  <Bookmark bookmark={bookmark} focus={index === 0} key={bookmark.id} />
                ))}
                type={'columns'}
              />
            );
        }

        return (
          <Popup
            clickPosition={popupProps.clickPosition}
            id={popupProps.id}
            key={popupProps.id}
            nestingLevel={popupProps.nestingLevel}
            popupManagerRef={popupManagerRef}
            title={popupProps.title}
          >
            {popupChildren}
          </Popup>
        );
      })}
    </div>
  );
};
