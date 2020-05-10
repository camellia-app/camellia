import { Favicon } from './Favicon';

export abstract class Bookmark {
  public readonly browserId: string;

  public readonly title: string;

  public readonly nestingLevel: number;

  protected constructor(
    browserId: string,
    title: string,
    nestingLevel: number,
  ) {
    this.browserId = browserId;
    this.title = title;
    this.nestingLevel = nestingLevel;
  }
}

export class Link extends Bookmark {
  public readonly url: string;

  public readonly favicon: Favicon;

  constructor(
    browserId: string,
    title: string,
    nestingLevel: number,
    url: string,
  ) {
    super(
      browserId,
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
    browserId: string,
    title: string,
    nestingLevel: number,
    children: Bookmark[],
  ) {
    super(
      browserId,
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
