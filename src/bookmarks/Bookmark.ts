import { Favicon } from './Favicon';

export abstract class Bookmark {
  public readonly browserId: string;

  public readonly title: string;

  protected constructor(
    browserId: string,
    title: string,
  ) {
    this.browserId = browserId;
    this.title = title;
  }
}

export class Link extends Bookmark {
  public readonly url: string;

  public readonly favicon: Favicon;

  constructor(
    browserId: string,
    title: string,
    url: string,
  ) {
    super(
      browserId,
      title,
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
    children: Bookmark[],
  ) {
    super(
      browserId,
      title,
    );

    this.children = children;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }
}

export class BookmarkRootCategory extends Folder {
}
