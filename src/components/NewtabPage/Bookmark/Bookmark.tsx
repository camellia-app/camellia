import Folder from '@material-design-icons/svg/filled/folder.svg';
import Public from '@material-design-icons/svg/filled/public.svg';
import type { FC, MouseEventHandler } from 'react';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFolderChildrenBookmarks } from '../../../api/bookmark';
import type { Bookmark as BookmarkEntry } from '../../../api/bookmark/common';
import { getFavicon } from '../../../api/favicon';
import { createTracingTransaction } from '../../../api/utils/sentry';
import { folderPopupSlice } from '../../../store/slice/folderPopupSlice';
import { Chip } from '../../common/Chip/Chip';
import { PopupNestingLevelContext } from '../Popup/PopupNestingLevelContext';

export const Bookmark: FC<{
  blurred?: boolean | undefined;
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
      folderPopupSlice.actions.togglePopup({
        placement: clickPosition,
        id: `bookmark-folder-${props.bookmark.id}`,
        title: props.bookmark.title,
        bookmarks: bookmarks,
        height: undefined,
        isPositionRecomputed: false,
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

  switch (props.bookmark.type) {
    case 'link': {
      let title = props.bookmark.title;

      if (title.trim().length === 0) {
        title = new URL(props.bookmark.url).hostname;
      }

      return (
        <Chip
          blurred={props.blurred}
          clickAction={clickAction}
          fallbackSvg={<Public />}
          focus={props.focus}
          iconSrc={getFavicon(props.bookmark.url, 128)}
          isLoading={isLoading}
          label={title}
          shape={'rounded'}
          tooltip={title}
          url={props.bookmark.url}
        />
      );
    }

    case 'folder':
      return (
        <Chip
          blurred={props.blurred}
          clickAction={clickAction}
          focus={props.focus}
          isLoading={isLoading}
          label={props.bookmark.title}
          shape={'rounded'}
          svg={<Folder />}
          tooltip={props.bookmark.title}
        />
      );
  }
};
