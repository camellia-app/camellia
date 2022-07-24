import { faker } from '@faker-js/faker';
import { AppPlatform, getPlatform } from '../appEnvironment';
import topWebsites from './assets/top-websites.json';
import type {
  CreateBookmark,
  InitializeRootFolders,
  GetBookmarksBarChildren,
  GetFolderChildrenBookmarks,
  GetOtherBookmarksChildren,
  SearchBookmarks,
} from './common';
import {
  createChromiumBookmark,
  getChromiumBookmarksBarChildren,
  getChromiumFolderChildrenBookmarks,
  getChromiumOtherBookmarksChildren,
  initializeChromiumRootFolders,
  searchChromiumBookmarks,
} from './platform/chromium';
import {
  createWebBookmark,
  geWebBookmarksBarChildren,
  initializeWebRootFolders,
  getWebFolderChildrenBookmarks,
  getWebOtherBookmarksChildren,
  searchWebBookmarks,
} from './platform/web';
import {
  createWebextBookmark,
  getWebextBookmarksBarChildren,
  getWebextFolderChildrenBookmarks,
  getWebextOtherBookmarksChildren,
  initializeWebextRootFolders,
  searchWebextBookmarks,
} from './platform/webext';

export const getFolderChildrenBookmarks: GetFolderChildrenBookmarks = (folderBookmarkId) => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumFolderChildrenBookmarks(folderBookmarkId);

    case AppPlatform.Webext:
      return getWebextFolderChildrenBookmarks(folderBookmarkId);

    case AppPlatform.Web:
      return getWebFolderChildrenBookmarks(folderBookmarkId);
  }
};

export const getBookmarksBarChildren: GetBookmarksBarChildren = () => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumBookmarksBarChildren();

    case AppPlatform.Webext:
      return getWebextBookmarksBarChildren();

    case AppPlatform.Web:
      return geWebBookmarksBarChildren();
  }
};

export const getOtherBookmarksChildren: GetOtherBookmarksChildren = () => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumOtherBookmarksChildren();

    case AppPlatform.Webext:
      return getWebextOtherBookmarksChildren();

    case AppPlatform.Web:
      return getWebOtherBookmarksChildren();
  }
};

export const searchBookmarks: SearchBookmarks = (searchQuery) => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return searchChromiumBookmarks(searchQuery);

    case AppPlatform.Webext:
      return searchWebextBookmarks(searchQuery);

    case AppPlatform.Web:
      return searchWebBookmarks(searchQuery);
  }
};

export const createBookmark: CreateBookmark = (bookmark) => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return createChromiumBookmark(bookmark);

    case AppPlatform.Webext:
      return createWebextBookmark(bookmark);

    case AppPlatform.Web:
      return createWebBookmark(bookmark);
  }
};

const initializeRootFolders: InitializeRootFolders = () => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return initializeChromiumRootFolders();

    case AppPlatform.Webext:
      return initializeWebextRootFolders();

    case AppPlatform.Web:
      return initializeWebRootFolders();
  }
};

export const generateDemoBookmarks = async (): Promise<void> => {
  const folderIds = await initializeRootFolders();

  for (const topWebsite of topWebsites) {
    await createBookmark({
      type: 'link',
      title: topWebsite,
      parentId: faker.helpers.arrayElement(folderIds),
      url: `https://${topWebsite}`,
    });

    const shouldCreateFolder = faker.datatype.number({ min: 0, max: 100 }) >= 70;

    if (shouldCreateFolder) {
      const createdFolder = await createBookmark({
        type: 'folder',
        title: faker.commerce.productName(),
        parentId: faker.helpers.arrayElement(folderIds),
      });

      folderIds.push(createdFolder.id);
    }
  }
};
