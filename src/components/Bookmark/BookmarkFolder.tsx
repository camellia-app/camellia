import type { MouseEventHandler, VoidFunctionComponent } from 'react';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../../store/actionCreators/folderPopup';
import type { Folder } from '../../bookmarkManager/bookmark';
import { createRef, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/file/svg/production/ic_folder_48px.svg?fill=%23eee');

type BookmarkFolderProps = {
  bookmark: Folder;
  focus: boolean;
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

  const buttonElementRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (props.focus) {
      buttonElementRef.current?.focus();
    }
  });

  return (
    <li className={s.bookmarkItem}>
      <button className={s.bookmark} onClick={handleFolderClick} ref={buttonElementRef} type="button">
        <Chip icon={icon} label={props.bookmark.title} loading={false} shape={ChipShape.Rounded} />
      </button>
    </li>
  );
};
