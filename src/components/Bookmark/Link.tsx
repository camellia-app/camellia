import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Bookmark.css';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

interface BookmarkProps {
  bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={classnames(s.bookmark, s.bookmarkLink)} href={props.bookmark.url} style="--bookmark-icon: url(https://www.google.com/favicon.ico)">{props.bookmark.title}</a>
  </li>
);
