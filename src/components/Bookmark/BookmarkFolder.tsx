import { Component, h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Bookmark.css';
import Folder from '../../bookmarks/Folder';
import FolderPopup from '../FolderPopup/FolderPopup';

interface BookmarkFolderProps {
  bookmark: Folder;
}

export interface ClickPosition {
  x: number;
  y: number;
}

interface BookmarkFolderState {
  opened: boolean;
  clickPosition?: ClickPosition;
}

export default class BookmarkFolder extends Component<BookmarkFolderProps, BookmarkFolderState> {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      opened: false,
    };
  }

  handleClick(event: MouseEvent) {
    if (this.state.opened === false) {
      this.setState({
        clickPosition: {
          x: event.pageX,
          y: event.pageY,
        },
        opened: true,
      });
    } else {
      this.setState({
        clickPosition: null,
        opened: false,
      });
    }
  }

  render(props: BookmarkFolderProps, state: BookmarkFolderState) {
    const classes = state.opened === false
      ? classnames(s.bookmark, s.bookmarkFolder)
      : classnames(s.bookmark, s.bookmarkFolder, s.open);

    return (
      <li className={s.bookmarkItem}>
        {state.opened ? <FolderPopup popupTitle={props.bookmark.title} clickPosition={state.clickPosition} childrenBookmarks={props.bookmark.children} /> : ''}

        <button className={classes} title={props.bookmark.title} type="button" onClick={this.handleClick}>
          <span className={s.bookmarkLabel}>{props.bookmark.title}</span>
        </button>
      </li>
    );
  }
}
