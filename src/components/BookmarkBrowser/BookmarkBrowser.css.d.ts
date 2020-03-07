declare namespace BookmarkBrowserCssModule {
  export interface IBookmarkBrowserCss {
    bookmarkBrowser: string;
    loading: string;
    noBookmarksMessage: string;
  }
}

declare const BookmarkBrowserCssModule: BookmarkBrowserCssModule.IBookmarkBrowserCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkBrowserCssModule.IBookmarkBrowserCss;
};

export = BookmarkBrowserCssModule;
