import { Favicon } from './Favicon';

export type BookmarkLocalId = string;

export type Bookmark = Link | Folder;

interface BookmarkCommon {
  idLocal: BookmarkLocalId;
  nestingLevel: number;
  parentIdLocal?: BookmarkLocalId;
  title: string;
}

export interface Link extends BookmarkCommon {
  favicon: Favicon;
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
