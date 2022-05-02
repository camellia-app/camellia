import { BookmarkList } from '../BookmarkList/BookmarkList';
import s from './BookmarkCategory.module.css';
import type { FC } from 'react';
import type { Bookmark } from '../../api/bookmark/common';

export const BookmarkCategory: FC<{
  bookmarks: Array<Bookmark>;
  categoryTitle: string;
}> = (props) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <BookmarkList bookmarks={props.bookmarks} focusFirstBookmark={false} type="columns" />
  </section>
);
