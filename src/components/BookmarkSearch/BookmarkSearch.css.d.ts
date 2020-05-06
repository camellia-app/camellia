declare namespace BookmarkSearchCssModule {
  export interface IBookmarkSearchCss {
    bookmarkSearch: string;
    bookmarkSearchCloseButton: string;
    bookmarkSearchField: string;
  }
}

declare const BookmarkSearchCssModule: BookmarkSearchCssModule.IBookmarkSearchCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkSearchCssModule.IBookmarkSearchCss;
};

export = BookmarkSearchCssModule;
