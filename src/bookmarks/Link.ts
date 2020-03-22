import Bookmark from './Bookmark';
import Favicon from './Favicon';

export default class Link extends Bookmark {
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
