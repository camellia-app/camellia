import { h } from 'preact';
import * as s from './Bookmark.css';
import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

interface BookmarkProps {
    bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
    <li class={s.bookmark}>
      <a href={props.bookmark.url}>{props.bookmark.title}</a>
    </li>
);
