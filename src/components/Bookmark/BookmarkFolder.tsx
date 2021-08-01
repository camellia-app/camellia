import {MouseEventHandler, useContext, VoidFunctionComponent} from 'react';
import { Folder } from '../../bookmarks/Bookmark';
import { Popups } from '../BookmarkBrowser/BookmarkBrowser';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/file/svg/production/ic_folder_48px.svg?fill=%23eee');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolderOpen = require('mdi/file/svg/production/ic_folder_open_48px.svg?fill=%23eee');

interface BookmarkFolderProps {
  bookmark: Folder;
}

export interface ClickPosition {
  x: number;
  y: number;
}

export const BookmarkFolder: VoidFunctionComponent<BookmarkFolderProps> = (props) => {
  const context = useContext(Popups);

  const handleFolderClick: MouseEventHandler<HTMLElement> = (event) => {
    const clickPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    if (context.togglePopup !== undefined) {
      context.togglePopup(props.bookmark, clickPosition);
    }
  };

  const icon = context.isPopupOpened !== undefined && context.isPopupOpened(props.bookmark) === false
    ? iconFolder
    : iconFolderOpen;

  return (
    <li className={s.bookmarkItem}>
      <button className={s.bookmark} onClick={handleFolderClick} type="button">
        <Chip icon={icon} label={props.bookmark.title} loading={false} shape={ChipShape.Rounded} />
      </button>
    </li>
  );
};
