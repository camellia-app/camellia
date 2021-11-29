import type { Bookmark } from '../../bookmarkManager/bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';
import type { VoidFunctionComponent } from 'react';

type BookmarkListProps = {
  bookmarks: Array<Bookmark>;
};

export const BookmarkList: VoidFunctionComponent<BookmarkListProps> = (props) => (
  <ul className={s.bookmarkList}>
    {props.bookmarks.map((item) => {
      if (item.type === 'link') {
        return <BookmarkLink bookmark={item} key={item.idLocal} />;
      }

      if (item.type === 'folder') {
        return <BookmarkFolder bookmark={item} key={item.idLocal} />;
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
