import type { FC } from 'react';

import { clsx } from 'clsx';

import type { Folder } from '../../../api/bookmark/common';

import { useFolderBookmarkChildren } from '../../../api/bookmark/hook';
import { ChipList } from '../../common/ChipList/ChipList';
import { Bookmark } from '../Bookmark/Bookmark';
import { Header } from '../Header/Header';
import { bookmarkCategory, bookmarkCategoryLoading } from './BookmarkCategory.module.css';

export const BookmarkCategory: FC<{
  bookmarkFolder: Folder;
}> = (props) => {
  const [bookmarks] = useFolderBookmarkChildren(props.bookmarkFolder.id);

  if (bookmarks === undefined || bookmarks.length === 0) {
    return <></>;
  }

  const mainClasses = clsx(bookmarkCategory, {
    [bookmarkCategoryLoading]: bookmarks === undefined,
  });

  return (
    <section className={mainClasses}>
      <Header level={2}>{props.bookmarkFolder.title}</Header>

      <ChipList
        chips={bookmarks.map((bookmarkEntry) => (
          <Bookmark bookmark={bookmarkEntry} focus={false} key={bookmarkEntry.id} />
        ))}
        type="columns"
      />
    </section>
  );
};
