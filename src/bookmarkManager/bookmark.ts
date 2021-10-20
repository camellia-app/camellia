export type BookmarkLocalId = string;

export type Bookmark = Link | Folder;

interface BookmarkCommon {
  idLocal: BookmarkLocalId;
  nestingLevel: number;
  parentIdLocal: BookmarkLocalId | undefined;
  title: string;
}

export interface Link extends BookmarkCommon {
  type: 'link';
  url: string;
}

export interface Folder extends BookmarkCommon {
  children: Bookmark[];
  isRootFolder: boolean;
  type: 'folder';
}

export function isFolder(bookmark: Bookmark): bookmark is Folder {
  return bookmark.type === 'folder';
}
