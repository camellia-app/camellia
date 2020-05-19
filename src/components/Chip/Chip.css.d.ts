declare namespace ChipCssNamespace {
  export interface IChipCss {
    chip: string;
    chipIcon: string;
    chipIconInline: string;
    chipLabel: string;
    chipRounded: string;
    chipSquared: string;
  }
}

declare const ChipCssModule: ChipCssNamespace.IChipCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChipCssNamespace.IChipCss;
};

export = ChipCssModule;
