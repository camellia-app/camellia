import { Bookmark, isFolder, isLink } from '../../bookmarks/Bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import s from './BookmarkList.module.css';

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export const BookmarkList = (props: BookmarkListProps) => (
  <ul className={s.bookmarkList}>
    {props.bookmarks.map((item) => {
      if (isLink(item)) {
        return (
          <BookmarkLink key={item.idLocal} bookmark={item} />
        );
      }

      if (isFolder(item)) {
        return (
          <BookmarkFolder key={item.idLocal} bookmark={item} />
        );
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
