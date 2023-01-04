import type { FC } from 'react';
import type { Bookmark as BookmarkEntry } from '../../../api/bookmark/common';
import { ChipList } from '../../common/ChipList/ChipList';
import { Bookmark } from '../Bookmark/Bookmark';
import { Header } from '../Header/Header';
import { bookmarkCategory } from './BookmarkCategory.module.css';

export const BookmarkCategory: FC<{
  bookmarks: Array<BookmarkEntry>;
  categoryTitle: string;
}> = (props) => (
  <section className={bookmarkCategory}>
    <Header level={2}>{props.categoryTitle}</Header>

    <ChipList
      chips={props.bookmarks.map((bookmarkEntry) => (
        <Bookmark blurred={true} bookmark={bookmarkEntry} focus={false} key={bookmarkEntry.id} />
      ))}
      type="columns"
    />
  </section>
);
