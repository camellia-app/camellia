import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Bookmark.css';
import Folder from '../../bookmarks/Folder';

interface BookmarkProps {
  bookmark: Folder;
}

export default (props: BookmarkProps) => (
  <li className={s.bookmarkItem}>
    <button className={classnames(s.bookmark, s.bookmarkFolder)} title={props.bookmark.title} type="button">
      <span className={s.bookmarkLabel}>{props.bookmark.title}</span>
    </button>
  </li>
);
