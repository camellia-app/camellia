import { h } from 'preact';
import * as s from './BookmarkCategory.css';
import { Bookmark } from '../../bookmarks/Bookmark';
import { BookmarkList } from '../BookmarkList/BookmarkList';

interface BookmarkCategoryProps {
  categoryTitle: string;
  bookmarks: Bookmark[];
}

export const BookmarkCategory = (props: BookmarkCategoryProps) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <BookmarkList bookmarks={props.bookmarks} />
  </section>
);
