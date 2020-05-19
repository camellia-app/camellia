declare namespace BookmarkSearchCssNamespace {
  export interface IBookmarkSearchCss {
    bookmarkSearch: string;
    bookmarkSearchCloseButton: string;
    bookmarkSearchField: string;
  }
}

declare const BookmarkSearchCssModule: BookmarkSearchCssNamespace.IBookmarkSearchCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkSearchCssNamespace.IBookmarkSearchCss;
};

export = BookmarkSearchCssModule;
