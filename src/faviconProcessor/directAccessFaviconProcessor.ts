import { FaviconProcessor } from './faviconProcessor';
import { Favicon } from './favicon';

export const directAccessFaviconProcessor: FaviconProcessor = {
  generateUrl: (url: string): Favicon => {
    const parsedUrl = new URL(url);

    return {
      variants: [
        {
          url: `${parsedUrl.origin}/favicon.ico`,
          dpi: 1,
        },
      ],
    };
  },
};
