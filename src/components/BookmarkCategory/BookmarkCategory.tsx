import { ChipList } from '../ChipList/ChipList';
import type { FC } from 'react';
import { Bookmark } from '../Bookmark/Bookmark';
import type { Bookmark as BookmarkEntry } from '../../api/bookmark/common';
import { bookmarkCategory, bookmarkCategoryTitle } from './BookmarkCategory.module.css';

export const BookmarkCategory: FC<{
  bookmarks: Array<BookmarkEntry>;
  categoryTitle: string;
}> = (props) => (
  <section className={bookmarkCategory}>
    <h2 className={bookmarkCategoryTitle}>{props.categoryTitle}</h2>

    <ChipList
      chips={props.bookmarks.map((bookmarkEntry) => (
        <Bookmark bookmark={bookmarkEntry} focus={false} key={bookmarkEntry.id} />
      ))}
      type="columns"
    />
  </section>
);
