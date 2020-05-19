declare namespace FolderPopupCssNamespace {
  export interface IFolderPopupCss {
    bookmarkListContainer: string;
    folderPopup: string;
    folderPopupTitle: string;
    loading: string;
  }
}

declare const FolderPopupCssModule: FolderPopupCssNamespace.IFolderPopupCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FolderPopupCssNamespace.IFolderPopupCss;
};

export = FolderPopupCssModule;
