import type { Favicon } from './favicon';
import type { FaviconProcessor } from './faviconProcessor';

export const camelliaProxyFaviconProcessor: FaviconProcessor = {
  generateUrl: (url: string): Favicon => {
    const parsedUrl = new URL(url);

    return {
      default: {
        url: `https://website-icons.camellia.app/favicon?domain=${encodeURIComponent(parsedUrl.hostname)}`,
        dpi: 1,
      },
      variants: [
        {
          url: `https://website-icons.camellia.app/favicon?domain=${encodeURIComponent(parsedUrl.hostname)}`,
          dpi: 1,
        },
      ],
    };
  },
};
