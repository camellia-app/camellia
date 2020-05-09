import { Component, h } from 'preact';
import * as s from './Bookmark.css';
import { FolderPopup } from '../FolderPopup/FolderPopup';
import { Chip, ChipShape } from '../Chip/Chip';
import { Folder } from '../../bookmarks/Bookmark';

const iconFolder = require('mdi/file/svg/production/ic_folder_48px.svg?fill=%23eee');
const iconFolderOpen = require('mdi/file/svg/production/ic_folder_open_48px.svg?fill=%23eee');

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

export class BookmarkFolder extends Component<BookmarkFolderProps, BookmarkFolderState> {
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
    const icon = state.opened === false
      ? iconFolder
      : iconFolderOpen;

    return (
      <li className={s.bookmarkItem}>
        {state.opened ? <FolderPopup popupTitle={props.bookmark.title} clickPosition={state.clickPosition} childrenBookmarks={props.bookmark.children} /> : ''}

        <button className={s.bookmark} type="button" onClick={this.handleClick}>
          <Chip label={props.bookmark.title} icon={icon} shape={ChipShape.Rounded} />
        </button>
      </li>
    );
  }
}
