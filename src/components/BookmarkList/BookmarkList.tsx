import { h } from 'preact';
import BookmarkLink from '../Bookmark/BookmarkLink';
import * as s from './BookmarkList.css';
import BookmarkFolder from '../Bookmark/BookmarkFolder';
import Bookmark from '../../bookmarks/Bookmark';
import Link from '../../bookmarks/Link';
import Folder from '../../bookmarks/Folder';

export interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export default (props: BookmarkListProps) => (
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
