import { h } from 'preact';
import * as s from './Bookmark.css';
import Link from '../../bookmarks/Link';

interface BookmarkProps {
  bookmark: Link;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={s.bookmark} title={props.bookmark.title} href={props.bookmark.url} rel="noopener" target="_self">
      <img className={s.bookmarkIcon} src={props.bookmark.favicon.x1} alt="Favicon" height="16" width="16" />
      <span className={s.bookmarkLabel}>{props.bookmark.title}</span>
    </a>
  </li>
);
