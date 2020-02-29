import { Component, h, Fragment } from 'preact';
import Link from '../Bookmark/Link';
import * as s from './BookmarkCategory.css';
import Folder from '../Bookmark/Folder';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface BookmarkCategoryProps {
  categoryTitle: string;
  bookmarks: BookmarkTreeNode[];
}

export default class BookmarkCategory extends Component<BookmarkCategoryProps> {
  render(props: BookmarkCategoryProps) {
    return (
      <section>
        <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>
        <ul className={s.bookmarkList}>
          {props.bookmarks.map((item) => {
            if (item.url !== undefined) {
              return (
                <Link bookmark={item} />
              );
            }
            return (
              <Folder bookmark={item} />
            );
          })}
        </ul>
      </section>
    );
  }
}
