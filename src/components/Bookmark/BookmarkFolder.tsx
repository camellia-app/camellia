import type { MouseEventHandler, VFC } from 'react';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../../store/actionCreators/popup';
import type { Folder } from '../../bookmarkManager/bookmark';
import { createRef, useContext, useEffect } from 'react';
import { getBookmarkManager } from '../../bookmarkManager';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/filled/folder.svg?fill=%23eee');

type BookmarkFolderProps = {
  bookmark: Folder;
  focus: boolean;
};

export const BookmarkFolder: VFC<BookmarkFolderProps> = (props) => {
  const dispatch = useDispatch();
  const nestingLevelContext = useContext(PopupNestingLevelContext);

  const handleFolderClick: MouseEventHandler<HTMLElement> = async (event) => {
    const clickPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    const bookmarkManager = getBookmarkManager();

    dispatch(
      togglePopup({
        clickPosition: clickPosition,
        id: `bookmark-folder-${props.bookmark.idLocal}`,
        title: props.bookmark.title,
        bookmarks: await bookmarkManager.getFolderChildren(props.bookmark.idLocal),
        nestingLevel: nestingLevelContext,
      }),
    );
  };

  const buttonElementRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (props.focus) {
      buttonElementRef.current?.focus();
    }
  });

  return (
    <li className={s.bookmarkItem}>
      <button className={s.bookmark} onClick={handleFolderClick} ref={buttonElementRef} type="button">
        <Chip inlineIcon={iconFolder} label={props.bookmark.title} loading={false} shape={ChipShape.Rounded} />
      </button>
    </li>
  );
};
