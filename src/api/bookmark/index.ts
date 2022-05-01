import { AppPlatform, getPlatform } from '../appEnvironment';
import type {
  GetBookmarksBarChildren,
  GetFolderChildrenBookmarks,
  GetOtherBookmarksChildren,
  SearchBookmarks,
} from './common';
import {
  getChromiumBookmarksBarChildren,
  getChromiumFolderChildrenBookmarks,
  getChromiumOtherBookmarksChildren,
  searchChromiumBookmarks,
} from './platform/chromium';
import {
  getWebextBookmarksBarChildren,
  getWebextFolderChildrenBookmarks,
  getWebextOtherBookmarksChildren,
  searchWebextBookmarks,
} from './platform/webext';

export const getFolderChildrenBookmarks: GetFolderChildrenBookmarks = (folderBookmarkId) => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumFolderChildrenBookmarks(folderBookmarkId);

    case AppPlatform.Webext:
      return getWebextFolderChildrenBookmarks(folderBookmarkId);
  }
};

export const getBookmarksBarChildren: GetBookmarksBarChildren = () => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumBookmarksBarChildren();

    case AppPlatform.Webext:
      return getWebextBookmarksBarChildren();
  }
};

export const getOtherBookmarksChildren: GetOtherBookmarksChildren = () => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumOtherBookmarksChildren();

    case AppPlatform.Webext:
      return getWebextOtherBookmarksChildren();
  }
};

export const searchBookmarks: SearchBookmarks = (searchQuery) => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return searchChromiumBookmarks(searchQuery);

    case AppPlatform.Webext:
      return searchWebextBookmarks(searchQuery);
  }
};
