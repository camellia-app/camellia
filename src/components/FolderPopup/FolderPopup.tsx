import { Component, createRef, h } from 'preact';
import { createPortal } from 'preact/compat';
import * as classnames from 'classnames';
import * as s from './FolderPopup.css';
import Bookmark from '../../bookmarks/Bookmark';
import BookmarkList from '../BookmarkList/BookmarkList';

const CURSOR_PADDING = 1;
const SCREEN_EDGE_SAFE_PADDING = 16;

interface FolderPopupProps {
  popupTitle: string,
  positionX: number,
  positionY: number,
  childrenBookmarks: Bookmark[]
}

interface FolderPopupState {
  height: number | null,
  loaded: boolean,
  positionX: number,
  positionY: number,
}

export default class FolderPopup extends Component<FolderPopupProps, FolderPopupState> {
  private readonly popup;

  constructor() {
    super();

    this.state = {
      height: null,
      loaded: false,
      positionX: 0,
      positionY: 0,
    };

    this.popup = createRef();
  }

  async componentDidMount() {
    const clickX = this.props.positionX;
    const clickY = this.props.positionY;

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const scrollPosition = document.documentElement.scrollTop;
    const clickWithinViewportY = clickY - scrollPosition;

    let positionX = clickX + CURSOR_PADDING;
    let positionY = clickWithinViewportY + CURSOR_PADDING;

    const rect = this.popup.current.getBoundingClientRect();

    let adjustedHeight = null;

    if (rect.width + clickX > viewportWidth) {
      positionX = clickX - rect.width - CURSOR_PADDING;
    }

    const willPopupFitIfPlacedUnderCursor = clickWithinViewportY + rect.height < viewportHeight;
    const willPopupFitIfPlacedAboveCursor = clickWithinViewportY - rect.height > 0;
    const isClickedInBottomOfPage = clickWithinViewportY > viewportHeight / 2;

    if (isClickedInBottomOfPage) {
      if (!willPopupFitIfPlacedUnderCursor) {
        if (willPopupFitIfPlacedAboveCursor) {
          positionY = clickWithinViewportY - rect.height - CURSOR_PADDING;
        } else {
          adjustedHeight = clickWithinViewportY - SCREEN_EDGE_SAFE_PADDING;
          positionY = clickWithinViewportY - adjustedHeight - CURSOR_PADDING;
        }
      }
    } else if (!willPopupFitIfPlacedUnderCursor) {
      adjustedHeight = viewportHeight - clickWithinViewportY - SCREEN_EDGE_SAFE_PADDING;
    }

    this.setState({
      height: adjustedHeight,
      loaded: true,
      positionX,
      positionY,
    });
  }

  render(props: FolderPopupProps, state: FolderPopupState) {
    const classes = state.loaded === false
      ? classnames(s.folderPopup, s.loading)
      : s.folderPopup;

    const computedHeight = state.height === null ? 'auto' : `${state.height}px`;

    const popup = (
      <div ref={this.popup} className={classes} style={`--folder-position-x: ${state.positionX}px; --folder-position-y: ${state.positionY}px; --popup-height: ${computedHeight};`}>
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
