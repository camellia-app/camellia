import { h } from 'preact';
import BookmarkLink from '../Bookmark/BookmarkLink';
import * as s from './BookmarkCategory.css';
import BookmarkFolder from '../Bookmark/BookmarkFolder';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface BookmarkCategoryProps {
  categoryTitle: string;
  bookmarks: BookmarkTreeNode[];
}

export default (props: BookmarkCategoryProps) => (
  <section>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>
    <ul className={s.bookmarkList}>
      {props.bookmarks.map((item) => {
        if (item.url !== undefined) {
          return (
            <BookmarkLink key={item.id} bookmark={item} />
          );
        }

        return (
          <BookmarkFolder key={item.id} bookmark={item} />
        );
      })}
    </ul>
  </section>
);
