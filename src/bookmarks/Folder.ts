import Bookmark from './Bookmark';

export default class Folder extends Bookmark {
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
