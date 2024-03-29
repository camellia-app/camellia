import { getActiveTransaction } from '@sentry/react';
import { useEffect, useState } from 'react';

import type { Bookmark, BookmarkId, Folder } from './common';

import { SENTRY_SPAN_STATUS_OK } from '../utils/sentry';
import { getFolderChildrenBookmarks, getRootFolderBookmarks, hasBookmarks } from './index';

export const useFolderBookmarkChildren = (folderBookmarkId: BookmarkId): [Array<Bookmark> | undefined] => {
  const [value, setValue] = useState<Array<Bookmark> | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      description: `id: ${folderBookmarkId}`,
      op: 'useFolderChildren',
    });

    getFolderChildrenBookmarks(folderBookmarkId)
      .then((bookmarks) => {
        span?.setStatus(SENTRY_SPAN_STATUS_OK);

        setValue(bookmarks);
      })
      .finally(() => {
        span?.finish();
      });
  }, [folderBookmarkId]);

  return [value];
};

export const useRootBookmarkFolders = (): [Array<Folder> | undefined] => {
  const [value, setValue] = useState<Array<Folder> | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useRootBookmarkFolders',
    });

    getRootFolderBookmarks()
      .then((bookmarks) => {
        span?.setStatus(SENTRY_SPAN_STATUS_OK);

        setValue(bookmarks);
      })
      .finally(() => {
        span?.finish();
      });
  }, []);

  return [value];
};

export const useHasBookmarks = (): [boolean | undefined] => {
  const [value, setValue] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useHasBookmarks',
    });

    hasBookmarks()
      .then((booleanValue) => {
        span?.setStatus(SENTRY_SPAN_STATUS_OK);

        setValue(booleanValue);
      })
      .finally(() => {
        span?.finish();
      });
  }, []);

  return [value];
};
