import type { Favicon } from './favicon';

export type FaviconProcessor = {
  generateUrl: (url: string) => Favicon;
};
