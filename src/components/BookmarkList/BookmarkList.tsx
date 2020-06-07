import { h } from 'preact';
import { Bookmark, Folder, Link } from '../../bookmarks/Bookmark';
import { BookmarkFolder } from '../Bookmark/BookmarkFolder';
import { BookmarkLink } from '../Bookmark/BookmarkLink';
import * as s from './BookmarkList.css';

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export const BookmarkList = (props: BookmarkListProps) => (
  <ul className={s.bookmarkList}>
    {props.bookmarks.map((item) => {
      if (item instanceof Link) {
        return (
          <BookmarkLink key={item.browserId} bookmark={item} />
        );
      }

      if (item instanceof Folder) {
        return (
          <BookmarkFolder key={item.browserId} bookmark={item} />
        );
      }

      throw Error('unknown bookmark type');
    })}
  </ul>
);
