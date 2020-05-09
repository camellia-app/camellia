import { Component, createRef, h } from 'preact';
import { createPortal } from 'preact/compat';
import * as classnames from 'classnames';
import * as s from './FolderPopup.css';
import { Bookmark } from '../../bookmarks/Bookmark';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import { ClickPosition } from '../Bookmark/BookmarkFolder';

const CURSOR_PADDING = 1;
const SCREEN_EDGE_SAFE_PADDING = 16;

interface FolderPopupProps {
  childrenBookmarks: Bookmark[]
  clickPosition: ClickPosition,
  popupTitle: string,
}

interface PopupPlacement {
  height: number | null,
  x: number,
  y: number,
}

interface FolderPopupState {
  loaded: boolean,
  placement: PopupPlacement,
}

export class FolderPopup extends Component<FolderPopupProps, FolderPopupState> {
  private static calculatePopupPlacement(
    clickX: number,
    clickY: number,
    unmodifiedPopupWidth: number,
    unmodifiedPopupHeight: number,
    viewportWidth: number,
    viewportHeight: number,
    scrollPosition: number,
  ): PopupPlacement {
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
  }

  private readonly popup;

  constructor() {
    super();

    this.state = {
      loaded: false,
      placement: {
        height: null,
        x: 0,
        y: 0,
      },
    };

    this.popup = createRef();
  }

  async componentDidMount() {
    const rect = this.popup.current.getBoundingClientRect();

    const calculatedPlacement = FolderPopup.calculatePopupPlacement(
      this.props.clickPosition.x,
      this.props.clickPosition.y,
      rect.width,
      rect.height,
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      document.documentElement.scrollTop,
    );

    this.setState({
      loaded: true,
      placement: calculatedPlacement,
    });
  }

  render(props: FolderPopupProps, state: FolderPopupState) {
    const classes = state.loaded === false
      ? classnames(s.folderPopup, s.loading)
      : s.folderPopup;

    const height = state.placement.height === null ? 'auto' : `${state.placement.height}px`;

    const popup = (
      <div ref={this.popup} className={classes} style={`--folder-position-x: ${state.placement.x}px; --folder-position-y: ${state.placement.y}px; --popup-height: ${height};`}>
        <h2 className={s.folderPopupTitle}>{props.popupTitle}</h2>

        <div className={s.bookmarkListContainer}>
          <BookmarkList bookmarks={props.childrenBookmarks} />
        </div>
      </div>
    );

    return createPortal(
      popup,
      document.querySelector('body'),
    );
  }
}
