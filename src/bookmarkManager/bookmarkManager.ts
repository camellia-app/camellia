import type { Bookmark, BookmarkLocalId, Folder } from './bookmark';

export type BookmarkManager = {
  getAllBookmarks: () => Promise<Array<Folder>>;
  getFolderChildren: (folderId: BookmarkLocalId) => Promise<Array<Bookmark>>;
  searchBookmarks: (searchQuery: string) => Promise<Array<Bookmark>>;
};
