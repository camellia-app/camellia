import { Component, createRef, h } from 'preact';
import { createPortal } from 'preact/compat';
import * as classnames from 'classnames';
import * as s from './FolderPopup.css';
import Bookmark from '../../bookmarks/Bookmark';
import BookmarkList from '../BookmarkList/BookmarkList';

interface FolderPopupProps {
  popupTitle: string,
  positionX: number,
  positionY: number,
  childrenBookmarks: Bookmark[]
}

interface FolderPopupState {
  positionX: number,
  positionY: number,
  loaded: boolean,
}

export default class FolderPopup extends Component<FolderPopupProps, FolderPopupState> {
  private readonly popup;

  constructor() {
    super();

    this.state = {
      loaded: false,
      positionX: 0,
      positionY: 0,
    };

    this.popup = createRef();
  }

  async componentDidMount() {
    const clickX = this.props.positionX;
    const clickY = this.props.positionY;

    let positionX = clickX + 1;
    let positionY = clickY + 1;

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const rect = this.popup.current.getBoundingClientRect();

    if (rect.width + clickX > viewportWidth) {
      positionX = clickX - rect.width - 1;
    }

    if (rect.height + clickY > viewportHeight) {
      positionY = clickY - rect.height - 1;
    }

    this.setState({
      loaded: true,
      positionX,
      positionY,
    });
  }

  render(props: FolderPopupProps, state: FolderPopupState) {
    const classes = state.loaded === false
      ? classnames(s.folderPopup, s.loading)
      : s.folderPopup;

    const popup = (
      <div ref={this.popup} className={classes} style={`--folder-position-x: ${state.positionX}px; --folder-position-y: ${state.positionY}px`}>
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
