import { h } from 'preact';
import BookmarkLink from '../Bookmark/BookmarkLink';
import * as s from './BookmarkCategory.css';
import BookmarkFolder from '../Bookmark/BookmarkFolder';
import Bookmark from '../../bookmarks/Bookmark';
import Link from '../../bookmarks/Link';
import Folder from '../../bookmarks/Folder';
import BookmarkList from '../BookmarkList/BookmarkList';

export interface BookmarkCategoryProps {
  categoryTitle: string;
  bookmarks: Bookmark[];
}

export default (props: BookmarkCategoryProps) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <BookmarkList bookmarks={props.bookmarks} />
  </section>
);
