interface FaviconVariant {
  dpi: number;
  url: string;
}

export interface Favicon {
  variants: FaviconVariant[];
}
