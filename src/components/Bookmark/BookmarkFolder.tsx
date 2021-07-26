import { MouseEventHandler, useContext } from 'react';
import { Folder } from '../../bookmarks/Bookmark';
import { Popups } from '../BookmarkBrowser/BookmarkBrowser';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';

const iconFolder = require('mdi/file/svg/production/ic_folder_48px.svg?fill=%23eee');
const iconFolderOpen = require('mdi/file/svg/production/ic_folder_open_48px.svg?fill=%23eee');

interface BookmarkFolderProps {
  bookmark: Folder;
}

export interface ClickPosition {
  x: number;
  y: number;
}

export const BookmarkFolder = (props: BookmarkFolderProps) => {
  const context = useContext(Popups);

  const handleFolderClick: MouseEventHandler<HTMLElement> = (event) => {
    const clickPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    context.togglePopup(props.bookmark, clickPosition);
  };

  const icon = context.isPopupOpened(props.bookmark) === false
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
