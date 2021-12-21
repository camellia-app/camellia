type FaviconVariant = {
  dpi: number;
  url: string;
};

export type Favicon = {
  default: FaviconVariant;
  variants: Array<FaviconVariant>;
};
