import { Component, h } from 'preact';
import * as s from './Bookmark.css';
import { FolderPopup, getFolderPopupAttributeId } from '../FolderPopup/FolderPopup';
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

export const getFolderBookmarkAttributeId = (folder: Folder): string => `folder-bookmark-${folder.browserId}`;

export class BookmarkFolder extends Component<BookmarkFolderProps, BookmarkFolderState> {
  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.closingPopupClickHandler);
  }

  openPopup = (x: number, y: number) => {
    this.setState({
      clickPosition: {
        x,
        y,
      },
      opened: true,
    });

    document.addEventListener('click', this.closingPopupClickHandler);
  };

  closingPopupClickHandler = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const isClickedOnBookmark = event.target.closest(`#${getFolderBookmarkAttributeId(this.props.bookmark)}`);
    const isClickedOnPopup = event.target.closest(`#${getFolderPopupAttributeId(this.props.bookmark)}`);

    if (isClickedOnBookmark || isClickedOnPopup) {
      return;
    }

    this.closePopup();
  };

  closePopup = () => {
    this.setState({
      clickPosition: null,
      opened: false,
    });

    document.removeEventListener('click', this.closingPopupClickHandler);
  };

  handleFolderClick = (event: MouseEvent) => {
    if (this.state.opened === false) {
      this.openPopup(event.pageX, event.pageY);
    } else {
      this.closePopup();
    }
  };

  render(props: BookmarkFolderProps, state: BookmarkFolderState) {
    const icon = state.opened === false
      ? iconFolder
      : iconFolderOpen;

    return (
      <li className={s.bookmarkItem}>
        {state.opened ? <FolderPopup folder={props.bookmark} clickPosition={state.clickPosition} /> : ''}

        <button className={s.bookmark} type="button" onClick={this.handleFolderClick} id={getFolderBookmarkAttributeId(props.bookmark)}>
          <Chip label={props.bookmark.title} icon={icon} shape={ChipShape.Rounded} />
        </button>
      </li>
    );
  }
}
