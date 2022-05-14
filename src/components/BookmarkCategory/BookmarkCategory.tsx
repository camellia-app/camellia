import { ChipList } from '../ChipList/ChipList';
import s from './BookmarkCategory.module.css';
import type { FC } from 'react';
import { Bookmark } from '../Bookmark/Bookmark';
import type { Bookmark as BookmarkEntry } from '../../api/bookmark/common';

export const BookmarkCategory: FC<{
  bookmarks: Array<BookmarkEntry>;
  categoryTitle: string;
}> = (props) => (
  <section className={s.bookmarkCategory}>
    <h2 className={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <ChipList
      chips={props.bookmarks.map((bookmarkEntry) => (
        <Bookmark bookmark={bookmarkEntry} focus={false} key={bookmarkEntry.id} />
      ))}
      type="columns"
    />
  </section>
);
