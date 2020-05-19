declare namespace BookmarkCategoryCssNamespace {
  export interface IBookmarkCategoryCss {
    bookmarkCategory: string;
    bookmarkCategoryTitle: string;
  }
}

declare const BookmarkCategoryCssModule: BookmarkCategoryCssNamespace.IBookmarkCategoryCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BookmarkCategoryCssNamespace.IBookmarkCategoryCss;
};

export = BookmarkCategoryCssModule;
