import type { FaviconProcessor } from './faviconProcessor';
import type { Favicon } from './favicon';

export const camelliaProxyFaviconProcessor: FaviconProcessor = {
  generateUrl: (url: string): Favicon => {
    const parsedUrl = new URL(url);

    return {
      default: {
        url: `https://favicons.camellia.app/?domain=${encodeURIComponent(parsedUrl.hostname)}`,
        dpi: 1,
      },
      variants: [
        {
          url: `https://favicons.camellia.app/?domain=${encodeURIComponent(parsedUrl.hostname)}`,
          dpi: 1,
        },
      ],
    };
  },
};
