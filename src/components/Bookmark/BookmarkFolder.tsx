import type { MouseEventHandler, FC } from 'react';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';
import { useDispatch } from 'react-redux';
import { createRef, useContext, useEffect } from 'react';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';
import { getFolderChildrenBookmarks } from '../../api/bookmark';
import type { Folder } from '../../api/bookmark/common';
import { popupSlice } from '../../store/slice/popupSlice';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/filled/folder.svg?fill=%23eee');

export const BookmarkFolder: FC<{
  bookmark: Folder;
  focus: boolean;
}> = (props) => {
  const dispatch = useDispatch();
  const nestingLevelContext = useContext(PopupNestingLevelContext);

  const handleFolderClick: MouseEventHandler<HTMLElement> = async (event) => {
    const clickPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    dispatch(
      popupSlice.actions.togglePopup({
        clickPosition: clickPosition,
        id: `bookmark-folder-${props.bookmark.id}`,
        title: props.bookmark.title,
        bookmarks: await getFolderChildrenBookmarks(props.bookmark.id),
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
    <button className={s.bookmark} onClick={handleFolderClick} ref={buttonElementRef} type="button">
      <Chip inlineIcon={iconFolder} label={props.bookmark.title} loading={false} shape={ChipShape.Rounded} />
    </button>
  );
};
