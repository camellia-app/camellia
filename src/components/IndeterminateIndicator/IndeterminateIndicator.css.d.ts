declare namespace IndeterminateIndicatorCssModule {
  export interface IIndeterminateIndicatorCss {
    indeterminate: string;
    indeterminateShort: string;
    progress: string;
    track: string;
  }
}

declare const IndeterminateIndicatorCssModule: IndeterminateIndicatorCssModule.IIndeterminateIndicatorCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndeterminateIndicatorCssModule.IIndeterminateIndicatorCss;
};

export = IndeterminateIndicatorCssModule;
