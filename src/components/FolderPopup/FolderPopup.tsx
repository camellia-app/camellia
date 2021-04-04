import cn from 'classnames';
import { Component, createRef, h } from 'preact';
import { Folder } from '../../bookmarks/Bookmark';
import * as bookmarkClasses from '../Bookmark/Bookmark.css';
import { ClickPosition } from '../Bookmark/BookmarkFolder';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import s from './FolderPopup.css';

const CURSOR_PADDING = 3;
const SCREEN_EDGE_SAFE_PADDING = 16;

interface FolderPopupProps {
  clickPosition: ClickPosition;
  closeAllNextPopups: (folder: Folder) => void;
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
  const willPopupFitIfPlacedUnderCursor = clickWithinViewportY + unmodifiedPopupHeight + SCREEN_EDGE_SAFE_PADDING < viewportHeight;
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

export class FolderPopup extends Component<FolderPopupProps, FolderPopupState> {
  popupElement = createRef();

  state = {
    isVisible: false,
    placement: {
      height: null,
      x: 0,
      y: 0,
    },
  };

  componentDidMount(): void {
    const rect = this.popupElement.current.getBoundingClientRect();

    const calculatedPlacement = calculatePopupPlacement(
      this.props.clickPosition.x,
      this.props.clickPosition.y,
      rect.width,
      rect.height,
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      document.documentElement.scrollTop,
    );

    if (this.state.isVisible === false) {
      this.setState({
        isVisible: true,
        placement: calculatedPlacement,
      });
    }
  }

  handlePopupBodyClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;

    if (isClickedOnBookmarkItem) {
      return;
    }

    this.props.closeAllNextPopups(this.props.folder);
  };

  render(props: FolderPopupProps, state: FolderPopupState) {
    const height = state.placement.height === null ? 'auto' : `${state.placement.height}px`;

    const headerId = `folder-popup-${props.folder.idLocal}-header`;

    return (
      <div
        ref={this.popupElement}
        aria-labelledby={headerId}
        className={cn(s.folderPopup, {
          [s.loading]: !state.isVisible,
        })}
        onClick={this.handlePopupBodyClick}
        role="dialog"
        style={{
          '--folder-position-x': `${state.placement.x}px`,
          '--folder-position-y': `${state.placement.y}px`,
          '--popup-height': height,
        }}
      >
        <h2 className={s.folderPopupTitle} id={headerId}>{props.folder.title}</h2>

        <div className={s.bookmarkListContainer}>
          <BookmarkList bookmarks={props.folder.children} />
        </div>
      </div>
    );
  }
}
