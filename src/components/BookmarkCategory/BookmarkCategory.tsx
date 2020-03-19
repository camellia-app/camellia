import { h } from 'preact';
import BookmarkLink from '../Bookmark/BookmarkLink';
import * as s from './BookmarkCategory.css';
import BookmarkFolder from '../Bookmark/BookmarkFolder';
import Bookmark from '../../bookmarks/Bookmark';
import Link from '../../bookmarks/Link';
import Folder from '../../bookmarks/Folder';

export interface BookmarkCategoryProps {
  categoryTitle: string;
  bookmarks: Bookmark[];
}

export default (props: BookmarkCategoryProps) => (
  <section>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>
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
  </section>
);
