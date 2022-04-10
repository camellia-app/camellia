import type { MouseEventHandler, VFC } from 'react';
import { createRef, useEffect, useState } from 'react';
import s from './Popup.module.css';
import cn from 'classnames';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import type { Bookmark } from '../../bookmarkManager/bookmark';
import { useDispatch } from 'react-redux';
import { closePopup } from '../../store/actionCreators/popup';
import type * as CSS from 'csstype';
import type { PopupId } from '../../store/reducers/popupReducer';
import { PopupNestingLevelContext } from './PopupNestingLevelContext';

type PopupProps = {
  bookmarks: Array<Bookmark>;
  clickPosition: ClickPosition;
  id: PopupId;
  nestingLevel: number;
  title: string;
};

export type ClickPosition = {
  x: number;
  y: number;
};

type PopupPlacement = {
  height: number | null;
  x: number;
  y: number;
};

type PopupState = {
  isVisible: boolean;
  placement: PopupPlacement;
};

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

export const Popup: VFC<PopupProps> = (props) => {
  const [popupState, setPopupStage] = useState<PopupState>({
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

    if (!popupState.isVisible) {
      setPopupStage({
        isVisible: true,
        placement: calculatedPlacement,
      });
    }
  }, [popupElement, props.clickPosition.x, props.clickPosition.y, popupState.isVisible]);

  const handleCloseButtonClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    dispatch(closePopup(props.id));
  };

  const headerId = `popup-header-${props.id}`;

  const styles: CSS.PopupProperties = {
    '--popup-position-x': `${popupState.placement.x}px`,
    '--popup-position-y': `${popupState.placement.y}px`,
    '--popup-height': popupState.placement.height === null ? 'auto' : `${popupState.placement.height}px`,
  };

  return (
    <dialog
      aria-labelledby={headerId}
      className={cn(s.popup, {
        [s.loading]: !popupState.isVisible,
      })}
      open={true}
      ref={popupElement}
      style={styles}
    >
      <div className={s.popupContent} role="presentation">
        <header className={s.popupHeader}>
          <h2 className={s.popupTitle} id={headerId}>
            {props.title}
          </h2>
          <button className={s.popupCloseButton} onClick={handleCloseButtonClick} title="Close popup [Escape]">
            Close popup [Escape]
          </button>
        </header>

        <div className={s.bookmarkListContainer}>
          <PopupNestingLevelContext.Provider value={props.nestingLevel + 1}>
            <BookmarkList bookmarks={props.bookmarks} focusFirstBookmark={true} />
          </PopupNestingLevelContext.Provider>
        </div>
      </div>
    </dialog>
  );
};
