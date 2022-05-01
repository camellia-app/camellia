export type BookmarkId = string;

export type Bookmark = Folder | Link;

type BookmarkCommon = {
  id: BookmarkId;
  title: string;
};

export type Link = BookmarkCommon & {
  type: 'link';
  url: string;
};

export type Folder = BookmarkCommon & {
  type: 'folder';
};

export const isFolder = (bookmark: Bookmark): bookmark is Folder => {
  return bookmark.type === 'folder';
};

export const isLink = (bookmark: Bookmark): bookmark is Link => {
  return bookmark.type === 'link';
};

export type GetBookmarksBarChildren = () => Promise<Array<Bookmark>>;
export type GetOtherBookmarksChildren = () => Promise<Array<Bookmark>>;

export type SearchBookmarks = (searchQuery: string) => Promise<Array<Bookmark>>;

export type GetFolderChildrenBookmarks = (folderBookmarkId: BookmarkId) => Promise<Array<Bookmark>>;
