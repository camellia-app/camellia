import type { Bookmark } from '../../bookmarkManager/bookmark';
import { BookmarkList } from '../BookmarkList/BookmarkList';
import s from './BookmarkCategory.module.css';
import type { VFC } from 'react';

type BookmarkCategoryProps = {
  bookmarks: Array<Bookmark>;
  categoryTitle: string;
};

export const BookmarkCategory: VFC<BookmarkCategoryProps> = (props) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <BookmarkList bookmarks={props.bookmarks} focusFirstBookmark={false} />
  </section>
);
