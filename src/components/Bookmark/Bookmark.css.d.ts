declare namespace BookmarkCssModule {
  export interface IBookmarkCss {
    bookmark: string;
    bookmarkFolder: string;
    bookmarkIcon: string;
    bookmarkItem: string;
    bookmarkLabel: string;
  }
}

declare const BookmarkCssModule: BookmarkCssModule.IBookmarkCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkCssModule.IBookmarkCss;
};

export = BookmarkCssModule;
