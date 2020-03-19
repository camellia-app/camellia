export default class Favicon {
  public readonly x1: string;

  public readonly x2: string;

  public readonly x3: string;

  public readonly x4: string;

  private static SIZE = 16;

  constructor(
    x1: string,
    x2: string,
    x3: string,
    x4: string,
  ) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.x4 = x4;
  }

  static createFromInternalBrowserUrl(url: string): Favicon {
    return new Favicon(
      Favicon.formatLinkByDPI(1, url),
      Favicon.formatLinkByDPI(2, url),
      Favicon.formatLinkByDPI(3, url),
      Favicon.formatLinkByDPI(4, url),
    );
  }

  private static formatLinkByDPI(dpi: number, url: string): string {
    return `chrome://favicon/size/${Favicon.SIZE}@${dpi}x/${url}`;
  }
}
