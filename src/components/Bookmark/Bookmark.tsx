import type { FC, MouseEventHandler } from 'react';
import type { Bookmark as BookmarkEntry, Folder, Link } from '../../api/bookmark/common';
import { isLink } from '../../api/bookmark/common';
import { useDispatch } from 'react-redux';
import { createRef, useContext, useEffect, useState } from 'react';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';
import { popupSlice } from '../../store/slice/popupSlice';
import { getFolderChildrenBookmarks } from '../../api/bookmark';
import s from './Bookmark.module.css';
import { Chip, ChipShape } from '../Chip/Chip';
import { getFaviconProcessor } from '../../faviconProcessor';

export const Bookmark: FC<{
  bookmark: BookmarkEntry;
  focus: boolean;
}> = (props) => {
  if (isLink(props.bookmark)) {
    return <BookmarkLink bookmark={props.bookmark} focus={props.focus} />;
  } else {
    return <BookmarkFolder bookmark={props.bookmark} focus={props.focus} />;
  }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/filled/folder.svg?fill=%23eee');

const BookmarkFolder: FC<{
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
        content: {
          type: 'bookmarkList',
          bookmarks: await getFolderChildrenBookmarks(props.bookmark.id),
        },
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconPublic = require('mdi/filled/public.svg?fill=%23eee');

const BookmarkLink: FC<{
  bookmark: Link;
  focus: boolean;
}> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLElement> = async (): Promise<void> => {
    setLoading(true);

    if (isLoading) {
      return;
    }

    setTimeout(() => {
      setLoading(false);
    }, 15000);
  };

  const linkElementRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (props.focus) {
      linkElementRef.current?.focus();
    }
  });

  return (
    <a
      className={s.bookmark}
      href={props.bookmark.url}
      onClick={handleClick}
      ref={linkElementRef}
      rel="noopener"
      target="_self"
    >
      <Chip
        fallbackInlineIcon={iconPublic}
        favicon={getFaviconProcessor().generateUrl(props.bookmark.url)}
        label={props.bookmark.title}
        loading={isLoading}
        shape={ChipShape.Rounded}
      />
    </a>
  );
};
