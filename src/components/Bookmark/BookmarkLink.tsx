import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Bookmark.css';
import { getFaviconUrl } from '../../BrowserAPI/Bookmark';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

interface BookmarkProps {
  bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={classnames(s.bookmark, s.bookmarkLink)} title={props.bookmark.title} href={props.bookmark.url} rel="noopener" target="_self" style={`--bookmark-icon: url(${getFaviconUrl(props.bookmark.url)})`}>
      {props.bookmark.title}
    </a>
  </li>
);
