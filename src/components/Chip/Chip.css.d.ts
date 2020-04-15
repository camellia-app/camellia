declare namespace ChipCssModule {
  export interface IChipCss {
    chip: string;
    chipIcon: string;
    chipIconInline: string;
    chipLabel: string;
  }
}

declare const ChipCssModule: ChipCssModule.IChipCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChipCssModule.IChipCss;
};

export = ChipCssModule;
