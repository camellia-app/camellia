import classNames from 'classnames';
import type { FC } from 'react';
import { getSupportedRuntimeFeatures } from '../../../api/applicationRuntime/features';
import { useHasBookmarks, useRootBookmarkFolders } from '../../../api/bookmark/hook';
import { t } from '../../../api/i18n/translate';
import { useOption } from '../../../api/options/hook';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import { BookmarkSearchDialog } from '../BookmarkSearchDialog/BookmarkSearchDialog';
import { BookmarkManager } from '../BottomToolbar/ToolbarItem/BookmarkManager';
import { bookmarkWorkspace, bookmarkWorkspaceCentered, bookmarkWorkspaceLoading } from './BookmarkWorkspace.module.css';
import { MiddleScreenMessage } from './MiddleScreenMessage/MiddleScreenMessage';

export const BookmarkWorkspace: FC = () => {
  const [rootFolders] = useRootBookmarkFolders();
  const [hasBookmarks] = useHasBookmarks();
  const [contentLayout] = useOption('content_layout');

  const isLoading = rootFolders === undefined || hasBookmarks === undefined || contentLayout === undefined;

  const mainClasses = classNames(bookmarkWorkspace, {
    [bookmarkWorkspaceLoading]: isLoading,
    [bookmarkWorkspaceCentered]: contentLayout === 'centered',
  });

  const noBookmarksActionChips = [];

  if (getSupportedRuntimeFeatures().bookmarkManagerPage) {
    noBookmarksActionChips.push(<BookmarkManager />);
  }

  return (
    <main className={mainClasses}>
      {hasBookmarks === false ? (
        <MiddleScreenMessage chips={noBookmarksActionChips} message={t('bookmarkBrowser_noBookmarks_label')} />
      ) : undefined}

      {rootFolders === undefined
        ? undefined
        : rootFolders.map((rootFolder, index) => {
            return <BookmarkCategory bookmarkFolder={rootFolder} key={index} />;
          })}

      <BookmarkSearchDialog />
    </main>
  );
};
