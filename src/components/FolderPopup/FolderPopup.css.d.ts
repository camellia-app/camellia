declare namespace FolderPopupCssModule {
  export interface IFolderPopupCss {
    bookmarkListContainer: string;
    folderPopup: string;
    folderPopupTitle: string;
    loading: string;
  }
}

declare const FolderPopupCssModule: FolderPopupCssModule.IFolderPopupCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FolderPopupCssModule.IFolderPopupCss;
};

export = FolderPopupCssModule;
