import { h } from 'preact';
import * as s from './Bookmark.css';
import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;
import * as classnames from 'classnames';

interface BookmarkProps {
  bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
  <li class={s.bookmarkItem}>
    <button class={classnames(s.bookmark, s.bookmarkFolder)}>{props.bookmark.title}</button>
  </li>
);
