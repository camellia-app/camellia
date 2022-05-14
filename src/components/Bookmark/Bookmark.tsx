import type { FC, MouseEventHandler } from 'react';
import type { Bookmark as BookmarkEntry, Folder, Link } from '../../api/bookmark/common';
import { isLink } from '../../api/bookmark/common';
import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';
import { popupSlice } from '../../store/slice/popupSlice';
import { getFolderChildrenBookmarks } from '../../api/bookmark';
import { getFaviconProcessor } from '../../faviconProcessor';
import { ChipButton, ChipLink, ChipShape } from '../Chip/Chip';

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
  const [isLoading, setLoading] = useState<boolean>(false);

  const clickAction: MouseEventHandler = async (event) => {
    setLoading(true);

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

    setLoading(false);
  };

  return (
    <ChipButton
      clickAction={clickAction}
      focus={props.focus}
      iconSrc={iconFolder}
      isLoading={isLoading}
      label={props.bookmark.title}
      shape={ChipShape.Rounded}
      tooltip={props.bookmark.title}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconPublic = require('mdi/filled/public.svg?fill=%23eee');

const BookmarkLink: FC<{
  bookmark: Link;
  focus: boolean;
}> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const clickAction = (): void => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 15000);
  };

  return (
    <ChipLink
      clickAction={clickAction}
      fallbackIconSrc={iconPublic}
      focus={props.focus}
      iconSrc={getFaviconProcessor().generateUrl(props.bookmark.url).default.url}
      isLoading={isLoading}
      label={props.bookmark.title}
      shape={ChipShape.Rounded}
      tooltip={props.bookmark.title}
      url={props.bookmark.url}
    />
  );
};
