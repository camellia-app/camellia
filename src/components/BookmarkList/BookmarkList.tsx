import { Bookmark } from '../../bookmarks/Bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';
import { VoidFunctionComponent } from 'react';

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export const BookmarkList: VoidFunctionComponent<BookmarkListProps> = (props) => (
  <ul className={s.bookmarkList}>
    {props.bookmarks.map((item) => {
      if (item.type === 'link') {
        return <BookmarkLink key={item.idLocal} bookmark={item} />;
      }

      if (item.type === 'folder') {
        return <BookmarkFolder key={item.idLocal} bookmark={item} />;
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
