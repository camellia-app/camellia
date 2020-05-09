import { h } from 'preact';
import * as s from './Bookmark.css';
import { Chip, ChipShape } from '../Chip/Chip';
import { Link } from '../../bookmarks/Bookmark';

interface BookmarkProps {
  bookmark: Link;
}

export const BookmarkLink = (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <a className={s.bookmark} href={props.bookmark.url} rel="noopener" target="_self">
      <Chip label={props.bookmark.title} icon={props.bookmark.favicon} shape={ChipShape.Rounded} />
    </a>
  </li>
);
