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

type CreateBookmarkCommon = {
  parentId?: BookmarkId | undefined;
  title: string;
};

export type CreateLinkParameters = CreateBookmarkCommon & {
  type: 'link';
  url: string;
};

export type CreateFolderParameters = CreateBookmarkCommon & {
  type: 'folder';
};

export type CreateBookmarkParameters = CreateFolderParameters | CreateLinkParameters;

export const isFolder = (bookmark: Bookmark): bookmark is Folder => {
  return bookmark.type === 'folder';
};

export const isLink = (bookmark: Bookmark): bookmark is Link => {
  return bookmark.type === 'link';
};

export type CreateBookmark = (bookmark: CreateBookmarkParameters) => Promise<Bookmark>;

export type SearchBookmarks = (searchQuery: string) => Promise<Array<Bookmark>>;

export type HasBookmarks = () => Promise<boolean>;

export type GetFolderChildrenBookmarks = (folderBookmarkId: BookmarkId) => Promise<Array<Bookmark>>;

export type GetRootFolderBookmarks = () => Promise<Array<Folder>>;

export type InitializeRootFolders = () => Promise<Array<BookmarkId>>;
