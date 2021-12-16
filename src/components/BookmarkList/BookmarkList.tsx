import type { Bookmark } from '../../bookmarkManager/bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';
import type { VoidFunctionComponent } from 'react';

type BookmarkListProps = {
  bookmarks: Array<Bookmark>;
  focusFirstBookmark: boolean;
};

export const BookmarkList: VoidFunctionComponent<BookmarkListProps> = (props) => (
  <ul className={s.bookmarkList}>
    {props.bookmarks.map((item, index) => {
      const enableAutoFocus = props.focusFirstBookmark && index === 0;

      if (item.type === 'link') {
        return <BookmarkLink bookmark={item} focus={enableAutoFocus} key={item.idLocal} />;
      }

      if (item.type === 'folder') {
        return <BookmarkFolder bookmark={item} focus={enableAutoFocus} key={item.idLocal} />;
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
