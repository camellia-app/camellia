import classNames from 'classnames';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { getSupportedRuntimeFeatures } from '../../api/applicationRuntime/features';
import type { Bookmark } from '../../api/bookmark/common';
import { useBookmarksBarChildren, useOtherBookmarksChildren } from '../../api/bookmark/hook';
import { t } from '../../api/i18n/translate';
import type { RootState } from '../../store';
import type { BookmarkSearchState } from '../../store/slice/bookmarkSearchSlice';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import { BookmarkSearch } from '../BookmarkSearch/BookmarkSearch';
import { BookmarkManager } from '../BottomToolbar/ToolbarItem/BookmarkManager';
import { ChipList } from '../ChipList/ChipList';
import {
  bookmarkWorkspace,
  bookmarkWorkspaceLoading,
  bookmarkWorkspaceNoBookmarks,
  bookmarkWorkspaceNoBookmarksActions,
  bookmarkWorkspaceNoBookmarksMessage,
} from './BookmarkWorkspace.module.css';

export const BookmarkWorkspace: FC = () => {
  const bookmarkSearchState = useSelector<RootState, BookmarkSearchState>((state) => state.bookmarkSearch);

  const [bookmarksBarChildren] = useBookmarksBarChildren();
  const [otherBookmarksChildren] = useOtherBookmarksChildren();

  const isLoading = bookmarksBarChildren === undefined || otherBookmarksChildren === undefined;

  const mainClasses = classNames(bookmarkWorkspace, {
    [bookmarkWorkspaceLoading]: isLoading,
  });

  const bookmarkCategories: Array<{ bookmarks: Array<Bookmark>; title: string }> = [];

  if (bookmarkSearchState.isActive) {
    bookmarkCategories.push({
      title: t('bookmarkCategory_searchResults_label'),
      bookmarks: bookmarkSearchState.bookmarks,
    });
  } else {
    if (bookmarksBarChildren !== undefined && bookmarksBarChildren.length > 0) {
      bookmarkCategories.push({
        title: t('bookmarkCategory_bookmarksBar_label'),
        bookmarks: bookmarksBarChildren,
      });
    }

    if (otherBookmarksChildren !== undefined && otherBookmarksChildren.length > 0) {
      bookmarkCategories.push({
        title: t('bookmarkCategory_otherBookmarks_label'),
        bookmarks: otherBookmarksChildren,
      });
    }
  }

  const noBookmarksActionChips = [];

  if (getSupportedRuntimeFeatures().bookmarkManagerPage) {
    noBookmarksActionChips.push(<BookmarkManager />);
  }

  return (
    <main className={mainClasses}>
      <BookmarkSearch />

      {!isLoading && bookmarkCategories.length === 0 ? (
        <div className={bookmarkWorkspaceNoBookmarks}>
          <div className={bookmarkWorkspaceNoBookmarksMessage}>{t('bookmarkBrowser_noBookmarks_label')}</div>

          {noBookmarksActionChips.length > 0 ? (
            <div className={bookmarkWorkspaceNoBookmarksActions}>
              <ChipList chips={noBookmarksActionChips} type={'inline'} />
            </div>
          ) : undefined}
        </div>
      ) : undefined}

      {bookmarkCategories.length > 0 &&
        bookmarkCategories.map((bookmarkCategory, index) => {
          return (
            <BookmarkCategory
              bookmarks={bookmarkCategory.bookmarks}
              categoryTitle={bookmarkCategory.title}
              key={index}
            />
          );
        })}
    </main>
  );
};
