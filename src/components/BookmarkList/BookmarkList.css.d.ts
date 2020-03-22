declare namespace BookmarkListCssModule {
  export interface IBookmarkListCss {
    bookmarkList: string;
  }
}

declare const BookmarkListCssModule: BookmarkListCssModule.IBookmarkListCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkListCssModule.IBookmarkListCss;
};

export = BookmarkListCssModule;
