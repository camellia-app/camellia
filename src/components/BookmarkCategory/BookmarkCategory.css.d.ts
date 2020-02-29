declare namespace BookmarkCategoryCssModule {
  export interface IBookmarkCategoryCss {
    bookmarkCategoryTitle: string;
    bookmarkList: string;
  }
}

declare const BookmarkCategoryCssModule: BookmarkCategoryCssModule.IBookmarkCategoryCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkCategoryCssModule.IBookmarkCategoryCss;
};

export = BookmarkCategoryCssModule;
