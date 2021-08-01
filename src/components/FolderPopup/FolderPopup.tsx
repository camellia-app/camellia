import cn from 'classnames';
import {Component, createRef, MouseEventHandler, ReactElement} from 'react';
import { Folder } from '../../bookmarks/Bookmark';
import bookmarkClasses from '../Bookmark/Bookmark.module.css';
import { ClickPosition } from '../Bookmark/BookmarkFolder';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import s from './FolderPopup.module.css';

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
  popupElement = createRef<HTMLDialogElement>();

  state: FolderPopupState = {
    isVisible: false,
    placement: {
      height: null,
      x: 0,
      y: 0,
    },
  };

  componentDidMount(): void {
    const element = this.popupElement.current;

    if (element === null) {
      return;
    }

    const rect = element.getBoundingClientRect();

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

  handlePopupBodyClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;

    if (isClickedOnBookmarkItem) {
      return;
    }

    this.props.closeAllNextPopups(this.props.folder);
  };

  render(): ReactElement {
    const height = this.state.placement.height === null ? 'auto' : `${this.state.placement.height}px`;

    const headerId = `folder-popup-${this.props.folder.idLocal}-header`;

    return (
      <dialog
        ref={this.popupElement}
        aria-labelledby={headerId}
        className={cn(s.folderPopup, {
          [s.loading]: !this.state.isVisible,
        })}
        open={true}
        style={{
          ['--folder-position-x' as string]: `${this.state.placement.x}px`,
          ['--folder-position-y' as string]: `${this.state.placement.y}px`,
          ['--popup-height' as string]: height,
        }}
      >
        <div role="presentation" className={s.folderPopupContent} onClick={this.handlePopupBodyClick}>
          <h2 className={s.folderPopupTitle} id={headerId}>{this.props.folder.title}</h2>

          <div className={s.bookmarkListContainer}>
            <BookmarkList bookmarks={this.props.folder.children} />
          </div>
        </div>
      </dialog>
    );
  }
}
