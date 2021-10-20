import { createRef, MouseEventHandler, useEffect, useState, VoidFunctionComponent } from 'react';
import s from './FolderPopup.module.css';
import cn from 'classnames';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import { ClickPosition } from '../Bookmark/BookmarkFolder';
import { Folder } from '../../bookmarkManager/bookmark';
import bookmarkClasses from '../Bookmark/Bookmark.module.css';
import { useDispatch } from 'react-redux';
import { closeAllNextPopups, closePopup } from '../../store/actionCreators/folderPopup';

export interface FolderPopupProps {
  clickPosition: ClickPosition;
  folder: Folder;
}

interface PopupPlacement {
  height: number | null;
  x: number;
  y: number;
}

interface FolderPopupState {
  isVisible: boolean;
  placement: PopupPlacement;
}

const CURSOR_PADDING = 3;
const SCREEN_EDGE_SAFE_PADDING = 16;

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

  let adjustedHeight = null;

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

export const FolderPopup: VoidFunctionComponent<FolderPopupProps> = (props) => {
  const [popupState, setPopupStage] = useState<FolderPopupState>({
    isVisible: false,
    placement: {
      height: null,
      x: 0,
      y: 0,
    },
  });

  const popupElement = createRef<HTMLDialogElement>();
  const dispatch = useDispatch();

  useEffect(() => {
    const element = popupElement.current;

    if (element === null) {
      return;
    }

    const rect = element.getBoundingClientRect();

    const calculatedPlacement = calculatePopupPlacement(
      props.clickPosition.x,
      props.clickPosition.y,
      rect.width,
      rect.height,
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      document.documentElement.scrollTop,
    );

    if (popupState.isVisible === false) {
      setPopupStage({
        isVisible: true,
        placement: calculatedPlacement,
      });
    }
  }, [popupElement, props.clickPosition.x, props.clickPosition.y, popupState.isVisible]);

  const handlePopupBodyClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;

    if (isClickedOnBookmarkItem) {
      return;
    }

    dispatch(closeAllNextPopups(props.folder));
  };

  const handleCloseButtonClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    dispatch(closePopup(props.folder));
  };

  const headerId = `folder-popup-${props.folder.idLocal}-header`;

  return (
    <dialog
      aria-labelledby={headerId}
      className={cn(s.folderPopup, {
        [s.loading]: !popupState.isVisible,
      })}
      open={true}
      ref={popupElement}
      style={{
        ['--folder-position-x' as string]: `${popupState.placement.x}px`,
        ['--folder-position-y' as string]: `${popupState.placement.y}px`,
        ['--popup-height' as string]:
          popupState.placement.height === null ? 'auto' : `${popupState.placement.height}px`,
      }}
    >
      <div className={s.folderPopupContent} onClick={handlePopupBodyClick} role="presentation">
        <header className={s.folderPopupHeader}>
          <h2 className={s.folderPopupTitle} id={headerId}>
            {props.folder.title}
          </h2>
          <button className={s.folderPopupCloseButton} onClick={handleCloseButtonClick} title="Close folder [Escape]">
            Close folder [Escape]
          </button>
        </header>

        <div className={s.bookmarkListContainer}>
          <BookmarkList bookmarks={props.folder.children} />
        </div>
      </div>
    </dialog>
  );
};
