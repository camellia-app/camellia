import Folder from '@material-design-icons/svg/filled/folder.svg';
import Public from '@material-design-icons/svg/filled/public.svg';
import type { FC, MouseEventHandler } from 'react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFolderChildrenBookmarks } from '../../api/bookmark';
import type { Bookmark as BookmarkEntry } from '../../api/bookmark/common';
import { getFavicon } from '../../api/favicon';
import { createTracingTransaction } from '../../api/utils/sentry';
import { popupSlice } from '../../store/slice/popupSlice';
import { Chip } from '../Chip/Chip';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';

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
    const transaction = createTracingTransaction('open_bookmark_folder');

    const span = transaction.startChild({
      op: 'getFolderChildrenBookmarks',
    });

    const bookmarks = await getFolderChildrenBookmarks(props.bookmark.id);

    span.finish();

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
          bookmarks: bookmarks,
        },
        nestingLevel: nestingLevelContext,
      }),
    );

    transaction.finish();
  };

  const clickAction: MouseEventHandler = async (event): Promise<void> => {
    switch (props.bookmark.type) {
      case 'folder': {
        const isOpenedWithHotkey = event.pageX === 0 && event.pageY === 0;

        if (!isOpenedWithHotkey) {
          await handleFolderClick(event.pageX, event.pageY);

          return;
        }

        const clickedElement = event.currentTarget.getBoundingClientRect();

        await handleFolderClick(clickedElement.right, clickedElement.bottom);

        break;
      }

      case 'link':
        handleLinkClick();
    }
  };

  const url = props.bookmark.type === 'link' ? props.bookmark.url : undefined;

  switch (props.bookmark.type) {
    case 'link':
      return (
        <Chip
          clickAction={clickAction}
          fallbackSvg={<Public />}
          focus={props.focus}
          iconSrc={getFavicon(props.bookmark.url, 128)}
          isLoading={isLoading}
          label={props.bookmark.title}
          shape={'rounded'}
          tooltip={props.bookmark.title}
          url={url}
        />
      );

    case 'folder':
      return (
        <Chip
          clickAction={clickAction}
          focus={props.focus}
          isLoading={isLoading}
          label={props.bookmark.title}
          shape={'rounded'}
          svg={<Folder />}
          tooltip={props.bookmark.title}
          url={url}
        />
      );
  }
};
