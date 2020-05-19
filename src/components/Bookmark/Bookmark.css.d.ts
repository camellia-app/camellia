declare namespace BookmarkCssNamespace {
  export interface IBookmarkCss {
    bookmark: string;
    bookmarkItem: string;
  }
}

declare const BookmarkCssModule: BookmarkCssNamespace.IBookmarkCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkCssNamespace.IBookmarkCss;
};

export = BookmarkCssModule;
