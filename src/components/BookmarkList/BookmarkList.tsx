import type { Bookmark } from '../../bookmarkManager/bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';
import type { VFC } from 'react';

export const BookmarkList: VFC<{
  bookmarks: Array<Bookmark>;
  focusFirstBookmark: boolean;
}> = (props) => (
  <ul className={s.bookmarkList}>
    {props.bookmarks.map((item, index) => {
      const enableAutoFocus = props.focusFirstBookmark && index === 0;

      if (item.type === 'link') {
        return (
          <li className={s.bookmarkListItem}>
            <BookmarkLink bookmark={item} focus={enableAutoFocus} key={item.idLocal} />
          </li>
        );
      }

      if (item.type === 'folder') {
        return (
          <li className={s.bookmarkListItem}>
            <BookmarkFolder bookmark={item} focus={enableAutoFocus} key={item.idLocal} />
          </li>
        );
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
