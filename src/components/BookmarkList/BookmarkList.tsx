import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';
import type { FC } from 'react';
import classNames from 'classnames';
import type { Bookmark } from '../../api/bookmark/common';

export const BookmarkList: FC<{
  bookmarks: Array<Bookmark>;
  focusFirstBookmark: boolean;
  type: 'columns' | 'inline';
}> = (props) => (
  <ul
    className={classNames(s.bookmarkList, {
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
              <BookmarkLink bookmark={item} focus={enableAutoFocus} key={item.id} />
            </li>
          );

        case 'folder':
          return (
            <li className={s.bookmarkListItem}>
              <BookmarkFolder bookmark={item} focus={enableAutoFocus} key={item.id} />
            </li>
          );
      }
    })}
  </ul>
);
