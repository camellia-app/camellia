import { Bookmark, BookmarkLocalId, Folder } from './bookmark';

export interface BookmarkManager {
  getAllBookmarks: () => Promise<Folder[]>;
  getFolderChildren: (folderId: BookmarkLocalId) => Promise<Bookmark[]>;
  searchBookmarks: (searchQuery: string) => Promise<Bookmark[]>;
}
