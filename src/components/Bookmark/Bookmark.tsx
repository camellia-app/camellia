import type { FC, MouseEventHandler } from 'react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFolderChildrenBookmarks } from '../../api/bookmark';
import type { Bookmark as BookmarkEntry } from '../../api/bookmark/common';
import { getFaviconProcessor } from '../../faviconProcessor';
import { popupSlice } from '../../store/slice/popupSlice';
import { Chip } from '../Chip/Chip';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconFolder = require('mdi/filled/folder.svg?fill=%23eee');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconPublic = require('mdi/filled/public.svg?fill=%23eee');

export const Bookmark: FC<{
  bookmark: BookmarkEntry;
  focus?: boolean | undefined;
}> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const nestingLevelContext = useContext(PopupNestingLevelContext);

  const handleLinkClick = (): void => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 15000);
  };

  const handleFolderClick = async (x: number, y: number): Promise<void> => {
    const clickPosition = {
      x: x,
      y: y,
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

  const clickAction: MouseEventHandler = (event): void => {
    switch (props.bookmark.type) {
      case 'folder':
        handleFolderClick(event.pageX, event.pageY);

        break;

      case 'link':
        handleLinkClick();
    }
  };

  const url = props.bookmark.type === 'link' ? props.bookmark.url : undefined;
  const icon =
    props.bookmark.type === 'link' ? getFaviconProcessor().generateUrl(props.bookmark.url).default.url : iconFolder;

  return (
    <Chip
      clickAction={clickAction}
      fallbackIconSrc={iconPublic}
      focus={props.focus}
      iconSrc={icon}
      isLoading={isLoading}
      label={props.bookmark.title}
      shape={'rounded'}
      tooltip={props.bookmark.title}
      url={url}
    />
  );
};
