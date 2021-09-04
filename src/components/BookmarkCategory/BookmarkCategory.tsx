import { Bookmark } from '../../bookmarks/Bookmark';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import s from './BookmarkCategory.module.css';
import { VoidFunctionComponent } from 'react';

interface BookmarkCategoryProps {
  bookmarks: Bookmark[];
  categoryTitle: string;
}

export const BookmarkCategory: VoidFunctionComponent<BookmarkCategoryProps> = (props) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <BookmarkList bookmarks={props.bookmarks} />
  </section>
);
