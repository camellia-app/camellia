export type BookmarkLocalId = string;

export type Bookmark = Folder | Link;

type BookmarkCommon = {
  idLocal: BookmarkLocalId;
  nestingLevel: number;
  parentIdLocal: BookmarkLocalId | undefined;
  title: string;
};

export type Link = BookmarkCommon & {
  type: 'link';
  url: string;
};

export type Folder = BookmarkCommon & {
  children: Array<Bookmark>;
  isRootFolder: boolean;
  type: 'folder';
};

export function isFolder(bookmark: Bookmark): bookmark is Folder {
  return bookmark.type === 'folder';
}
