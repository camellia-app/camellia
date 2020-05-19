declare namespace BottomToolbarCssNamespace {
  export interface IBottomToolbarCss {
    bottomToolbar: string;
    bottomToolbarItems: string;
  }
}

declare const BottomToolbarCssModule: BottomToolbarCssNamespace.IBottomToolbarCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BottomToolbarCssNamespace.IBottomToolbarCss;
};

export = BottomToolbarCssModule;
