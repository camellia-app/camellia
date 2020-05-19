declare namespace BookmarkListCssNamespace {
  export interface IBookmarkListCss {
    bookmarkList: string;
  }
}

declare const BookmarkListCssModule: BookmarkListCssNamespace.IBookmarkListCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkListCssNamespace.IBookmarkListCss;
};

export = BookmarkListCssModule;
