import { getActiveTransaction } from '@sentry/tracing';
import { useEffect, useState } from 'react';
import { SENTRY_SPAN_STATUS_OK } from '../utils/sentry';
import type { Bookmark } from './common';
import { getBookmarksBarChildren, getOtherBookmarksChildren } from './index';

export const useBookmarksBarChildren = (): [Array<Bookmark> | undefined] => {
  const [value, setValue] = useState<Array<Bookmark> | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useBookmarksBarChildren',
    });

    getBookmarksBarChildren()
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

export const useOtherBookmarksChildren = (): [Array<Bookmark> | undefined] => {
  const [value, setValue] = useState<Array<Bookmark> | undefined>(undefined);

  useEffect(() => {
    const span = getActiveTransaction()?.startChild({
      op: 'useOtherBookmarksChildren',
    });

    getOtherBookmarksChildren()
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
