declare namespace BackgroundMediaCssModule {
  export interface IBackgroundMediaCss {
    backgroundMedia: string;
    backgroundMediaContainer: string;
    loading: string;
  }
}

declare const BackgroundMediaCssModule: BackgroundMediaCssModule.IBackgroundMediaCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BackgroundMediaCssModule.IBackgroundMediaCss;
};

export = BackgroundMediaCssModule;
