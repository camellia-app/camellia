import type { FC } from 'react';

import { createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../../store';
import type { FolderPopupsState } from '../../../../store/slice/folderPopupSlice';

import { t } from '../../../../api/i18n/translate';
import { folderPopupSlice } from '../../../../store/slice/folderPopupSlice';
import { ChipList } from '../../../common/ChipList/ChipList';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { Bookmark } from '../../Bookmark/Bookmark';
import { Popup } from '../Popup';
import { popupManager } from './PopupManager.module.css';

export const PopupManager: FC = () => {
  const popupsState = useSelector<RootState, FolderPopupsState>((state) => state.folderPopup);

  const dispatch = useDispatch();

  useEffect(() => {
    const popupEscapeKeyPressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        dispatch(folderPopupSlice.actions.closeLastPopup());
      }
    };

    document.addEventListener('keydown', popupEscapeKeyPressHandler);

    return (): void => {
      document.removeEventListener('keydown', popupEscapeKeyPressHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    const screenResizeHandler = (): void => {
      dispatch(folderPopupSlice.actions.closeAllPopups());
    };

    window.addEventListener('resize', screenResizeHandler);

    return (): void => {
      window.removeEventListener('resize', screenResizeHandler);
    };
  }, [dispatch]);

  const ref = createRef<HTMLDivElement>();

  useOnClickOutside(ref, () => {
    dispatch(folderPopupSlice.actions.closeAllPopups());
  });

  return (
    <div className={popupManager} ref={ref}>
      {popupsState.popupsStack.map((popupState) => {
        const onClose = (): void => {
          dispatch(folderPopupSlice.actions.closePopup(popupState.nestingLevel));
        };

        const onBodyClick = (): void => {
          dispatch(folderPopupSlice.actions.closeNextPopups(popupState.nestingLevel));
        };

        const onRenderChildren = (popupWidth: number, popupHeight: number): void => {
          if (popupState.isPositionRecomputed) {
            return;
          }

          const calculatedPlacement = calculatePopupPlacement(
            popupState.placement.x,
            popupState.placement.y,
            popupWidth,
            popupHeight,
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
            document.documentElement.scrollTop,
          );

          dispatch(
            folderPopupSlice.actions.repositionPopup({
              height: calculatedPlacement.height,
              popupIndex: popupState.nestingLevel,
              x: calculatedPlacement.x,
              y: calculatedPlacement.y,
            }),
          );
        };

        return (
          <Popup
            height={popupState.height}
            id={popupState.id}
            key={popupState.id}
            nestingLevel={popupState.nestingLevel}
            onBodyClick={onBodyClick}
            onClose={onClose}
            onRenderChildren={onRenderChildren}
            title={popupState.title}
            x={popupState.placement.x}
            y={popupState.placement.y}
          >
            {popupState.bookmarks.length === 0 ? (
              t('popup_content_emptyFolder')
            ) : (
              <ChipList
                chips={popupState.bookmarks.map((bookmark) => (
                  <Bookmark bookmark={bookmark} key={bookmark.id} />
                ))}
                type={'columns'}
              />
            )}
          </Popup>
        );
      })}
    </div>
  );
};

const CURSOR_PADDING = 3;
const SCREEN_EDGE_SAFE_PADDING = 16;

type PopupPlacement = {
  height?: number | undefined;
  x: number;
  y: number;
};

const calculatePopupPlacement = (
  clickX: number,
  clickY: number,
  unmodifiedPopupWidth: number,
  unmodifiedPopupHeight: number,
  viewportWidth: number,
  viewportHeight: number,
  scrollPosition: number,
): PopupPlacement => {
  const clickWithinViewportY = clickY - scrollPosition;

  let positionX = clickX + CURSOR_PADDING;
  let positionY = clickWithinViewportY + CURSOR_PADDING;

  let adjustedHeight = undefined;

  const isClickedInTopOfPage = clickWithinViewportY < viewportHeight / 2;
  const willPopupFitIfPlacedUnderCursor =
    clickWithinViewportY + unmodifiedPopupHeight + SCREEN_EDGE_SAFE_PADDING < viewportHeight;
  const willPopupFitIfPlacedAboveCursor = clickWithinViewportY - unmodifiedPopupHeight - SCREEN_EDGE_SAFE_PADDING > 0;

  if (isClickedInTopOfPage && !willPopupFitIfPlacedUnderCursor) {
    adjustedHeight = viewportHeight - clickWithinViewportY - SCREEN_EDGE_SAFE_PADDING;
  } else if (!isClickedInTopOfPage && !willPopupFitIfPlacedUnderCursor) {
    positionY = clickWithinViewportY - unmodifiedPopupHeight - CURSOR_PADDING;

    if (!willPopupFitIfPlacedAboveCursor) {
      adjustedHeight = clickWithinViewportY - SCREEN_EDGE_SAFE_PADDING;
      positionY = clickWithinViewportY - adjustedHeight - CURSOR_PADDING;
    }
  }

  const willPopupFitIfPlacedRightOfCursor = clickX + unmodifiedPopupWidth + SCREEN_EDGE_SAFE_PADDING < viewportWidth;

  if (!willPopupFitIfPlacedRightOfCursor) {
    positionX = clickX - unmodifiedPopupWidth - CURSOR_PADDING;
  }

  return {
    height: adjustedHeight,
    x: positionX,
    y: positionY,
  };
};
