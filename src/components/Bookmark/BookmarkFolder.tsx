import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Bookmark.css';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

interface BookmarkProps {
  bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <button className={classnames(s.bookmark, s.bookmarkFolder)} title={props.bookmark.title} type="button">
      {props.bookmark.title}
    </button>
  </li>
);
