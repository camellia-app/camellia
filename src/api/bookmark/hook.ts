import { useEffect, useState } from 'react';
import type { Bookmark } from './common';
import { getBookmarksBarChildren, getOtherBookmarksChildren } from './index';

export const useBookmarksBarChildren = (): [Array<Bookmark> | undefined] => {
  const [value, setValue] = useState<Array<Bookmark> | undefined>(undefined);

  useEffect(() => {
    getBookmarksBarChildren().then((bookmarks) => {
      setValue(bookmarks);
    });
  }, []);

  return [value];
};

export const useOtherBookmarksChildren = (): [Array<Bookmark> | undefined] => {
  const [value, setValue] = useState<Array<Bookmark> | undefined>(undefined);

  useEffect(() => {
    getOtherBookmarksChildren().then((bookmarks) => {
      setValue(bookmarks);
    });
  }, []);

  return [value];
};
