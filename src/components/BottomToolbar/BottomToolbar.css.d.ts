declare namespace BottomToolbarCssModule {
  export interface IBottomToolbarCss {
    bottomToolbar: string;
    bottomToolbarItems: string;
  }
}

declare const BottomToolbarCssModule: BottomToolbarCssModule.IBottomToolbarCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BottomToolbarCssModule.IBottomToolbarCss;
};

export = BottomToolbarCssModule;
