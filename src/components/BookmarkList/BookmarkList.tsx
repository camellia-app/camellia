import type { Bookmark } from '../../bookmarkManager/bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';
import type { VFC } from 'react';
import cn from 'classnames';

export const BookmarkList: VFC<{
  bookmarks: Array<Bookmark>;
  focusFirstBookmark: boolean;
  type: 'columns' | 'inline';
}> = (props) => (
  <ul
    className={cn(s.bookmarkList, {
      [s.bookmarkListInline]: props.type === 'inline',
      [s.bookmarkListColumns]: props.type === 'columns',
    })}
  >
    {props.bookmarks.map((item, index) => {
      const enableAutoFocus = props.focusFirstBookmark && index === 0;

      switch (item.type) {
        case 'link':
          return (
            <li className={s.bookmarkListItem}>
              <BookmarkLink bookmark={item} focus={enableAutoFocus} key={item.idLocal} />
            </li>
          );

        case 'folder':
          return (
            <li className={s.bookmarkListItem}>
              <BookmarkFolder bookmark={item} focus={enableAutoFocus} key={item.idLocal} />
            </li>
          );
      }
    })}
  </ul>
);
