import { h } from 'preact';
import * as s from './Bookmark.css';
import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;
import * as classnames from 'classnames';

interface BookmarkProps {
  bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
  <li class={s.bookmarkItem}>
    <a class={classnames(s.bookmark, s.bookmarkLink)} href={props.bookmark.url} style="--bookmark-icon: url(https://www.google.com/favicon.ico)">{props.bookmark.title}</a>
  </li>
);
