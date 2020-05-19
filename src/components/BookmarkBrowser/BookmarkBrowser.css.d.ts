declare namespace BookmarkBrowserCssNamespace {
  export interface IBookmarkBrowserCss {
    bookmarkBrowser: string;
    loading: string;
    noBookmarksMessage: string;
  }
}

declare const BookmarkBrowserCssModule: BookmarkBrowserCssNamespace.IBookmarkBrowserCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkBrowserCssNamespace.IBookmarkBrowserCss;
};

export = BookmarkBrowserCssModule;
