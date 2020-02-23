import { h } from 'preact';
import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

interface BookmarkProps {
    bookmark: BookmarkTreeNode;
}

export default (props: BookmarkProps) => (
    <li>
      <a href={props.bookmark.url}>{props.bookmark.title}</a>
    </li>
);
