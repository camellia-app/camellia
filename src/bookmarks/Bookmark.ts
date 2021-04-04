import { Favicon } from './Favicon';

export type BookmarkLocalId = string;

export abstract class Bookmark {
  public readonly idLocal: BookmarkLocalId;

  public readonly title: string;

  public readonly nestingLevel: number;

  protected constructor(
    idLocal: BookmarkLocalId,
    title: string,
    nestingLevel: number,
  ) {
    this.idLocal = idLocal;
    this.title = title;
    this.nestingLevel = nestingLevel;
  }
}

export class Link extends Bookmark {
  public readonly url: string;

  public readonly favicon: Favicon;

  constructor(
    idLocal: BookmarkLocalId,
    title: string,
    nestingLevel: number,
    url: string,
  ) {
    super(
      idLocal,
      title,
      nestingLevel,
    );

    this.url = url;
    this.favicon = new Favicon(url);
  }
}

export class Folder extends Bookmark {
  public readonly children: Bookmark[];

  constructor(
    idLocal: BookmarkLocalId,
    title: string,
    nestingLevel: number,
    children: Bookmark[],
  ) {
    super(
      idLocal,
      title,
      nestingLevel,
    );

    this.children = children;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}

export class BookmarkRootCategory extends Folder {
}

export function isFolder(bookmark: any): bookmark is Folder {
  return bookmark.children !== undefined;
}

export function isLink(bookmark: any): bookmark is Link {
  return bookmark.url !== undefined;
}
