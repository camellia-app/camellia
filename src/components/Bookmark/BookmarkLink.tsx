import { h } from 'preact';
import * as s from './Bookmark.css';
import Link from '../../bookmarks/Link';
import Chip from '../Chip/Chip';

interface BookmarkProps {
  bookmark: Link;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={s.bookmark} href={props.bookmark.url} rel="noopener" target="_self">
      <Chip label={props.bookmark.title} icon={props.bookmark.favicon} />
    </a>
  </li>
);
