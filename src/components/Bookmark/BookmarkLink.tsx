import { h } from 'preact';
import * as s from './Bookmark.css';
import Link from '../../bookmarks/Link';

interface BookmarkProps {
  bookmark: Link;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={s.bookmark} title={props.bookmark.title} href={props.bookmark.url} rel="noopener" target="_self">
      <picture className={s.bookmarkIcon}>
        <source srcSet={props.bookmark.favicon.getSrcSetString()} />
        <img src={props.bookmark.favicon.getDefaultFavicon().url} alt="Favicon" height="16" width="16" />
      </picture>

      <span className={s.bookmarkLabel}>{props.bookmark.title}</span>
    </a>
  </li>
);
