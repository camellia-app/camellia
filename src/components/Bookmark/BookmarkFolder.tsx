import type { MouseEventHandler, VoidFunctionComponent } from 'react';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../../store/actionCreators/folderPopup';
import type { Folder } from '../../bookmarkManager/bookmark';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/file/svg/production/ic_folder_48px.svg?fill=%23eee');

type BookmarkFolderProps = {
  bookmark: Folder;
};

export const BookmarkFolder: VoidFunctionComponent<BookmarkFolderProps> = (props) => {
  const dispatch = useDispatch();

  const handleFolderClick: MouseEventHandler<HTMLElement> = (event) => {
    const clickPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    dispatch(
      togglePopup({
        folder: props.bookmark,
        clickPosition: clickPosition,
      }),
    );
  };

  const icon = iconFolder;

  return (
    <li className={s.bookmarkItem}>
      <button className={s.bookmark} onClick={handleFolderClick} type="button">
        <Chip icon={icon} label={props.bookmark.title} loading={false} shape={ChipShape.Rounded} />
      </button>
    </li>
  );
};
