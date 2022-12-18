import classNames from 'classnames';
import type { FC } from 'react';
import { getSupportedRuntimeFeatures } from '../../../api/applicationRuntime/features';
import type { Bookmark } from '../../../api/bookmark/common';
import { useBookmarksBarChildren, useOtherBookmarksChildren } from '../../../api/bookmark/hook';
import { t } from '../../../api/i18n/translate';
import { useOption } from '../../../api/options/hook';
import { ContentLayoutType } from '../../../api/options/options';
import { useBookmarkSearch } from '../../../store/hooks/useBookmarkSearchHook';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import { BookmarkSearch } from '../BookmarkSearch/BookmarkSearch';
import { BookmarkManager } from '../BottomToolbar/ToolbarItem/BookmarkManager';
import { bookmarkWorkspace, bookmarkWorkspaceCentered, bookmarkWorkspaceLoading } from './BookmarkWorkspace.module.css';
import { MiddleScreenMessage } from './MiddleScreenMessage/MiddleScreenMessage';

export const BookmarkWorkspace: FC = () => {
  const [isSearchActive, searchResultBookmarks] = useBookmarkSearch();
  const [bookmarksBarChildren] = useBookmarksBarChildren();
  const [otherBookmarksChildren] = useOtherBookmarksChildren();
  const [contentLayout] = useOption('content_layout');

  const isLoading =
    bookmarksBarChildren === undefined || otherBookmarksChildren === undefined || contentLayout === undefined;

  const mainClasses = classNames(bookmarkWorkspace, {
    [bookmarkWorkspaceLoading]: !isSearchActive && isLoading,
    [bookmarkWorkspaceCentered]: contentLayout === ContentLayoutType.Centered,
  });

  const bookmarkCategories: Array<{ bookmarks: Array<Bookmark>; title: string }> = [];

  if (isSearchActive) {
    bookmarkCategories.push({
      title: t('bookmarkCategory_searchResults_label'),
      bookmarks: searchResultBookmarks.slice(0, 200), // 200 search results maximum to prevent lags
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
        <MiddleScreenMessage chips={noBookmarksActionChips} message={t('bookmarkBrowser_noBookmarks_label')} />
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