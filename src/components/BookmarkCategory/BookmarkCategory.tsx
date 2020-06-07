import { h } from 'preact';
import { Bookmark } from '../../bookmarks/Bookmark';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import * as s from './BookmarkCategory.css';

interface BookmarkCategoryProps {
  bookmarks: Bookmark[];
  categoryTitle: string;
}

export const BookmarkCategory = (props: BookmarkCategoryProps) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <BookmarkList bookmarks={props.bookmarks} />
  </section>
);
