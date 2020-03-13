import { h } from 'preact';
import * as s from './Bookmark.css';
import { getFaviconUrl } from '../../BrowserAPI/Bookmark';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

interface BookmarkProps {
  bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={s.bookmark} title={props.bookmark.title} href={props.bookmark.url} rel="noopener" target="_self">
      <img className={s.bookmarkIcon} src={getFaviconUrl(props.bookmark.url)} alt="Favicon" height="16" width="16" />
      <span className={s.bookmarkLabel}>{props.bookmark.title}</span>
    </a>
  </li>
);
