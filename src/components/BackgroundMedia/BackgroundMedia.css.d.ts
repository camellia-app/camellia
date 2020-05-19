declare namespace BackgroundMediaCssNamespace {
  export interface IBackgroundMediaCss {
    backgroundMedia: string;
    backgroundMediaContainer: string;
    backgroundMediaContainerVisible: string;
    fadein: string;
  }
}

declare const BackgroundMediaCssModule: BackgroundMediaCssNamespace.IBackgroundMediaCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BackgroundMediaCssNamespace.IBackgroundMediaCss;
};

export = BackgroundMediaCssModule;
