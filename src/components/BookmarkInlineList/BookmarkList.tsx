import type { Bookmark } from '../../bookmarkManager/bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkInlineList.module.css';
import type { VoidFunctionComponent } from 'react';

export const BookmarkInlineList: VoidFunctionComponent<{
  bookmarks: Array<Bookmark>;
}> = (props) => (
  <ul className={s.bookmarkInlineList}>
    {props.bookmarks.map((item) => {
      if (item.type === 'link') {
        return (
          <li className={s.bookmarkInlineListItem}>
            <BookmarkLink bookmark={item} key={item.idLocal} />
          </li>
        );
      }

      if (item.type === 'folder') {
        return (
          <li className={s.bookmarkInlineListItem}>
            <BookmarkFolder bookmark={item} key={item.idLocal} />
          </li>
        );
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
