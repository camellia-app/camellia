import { Favicon } from './favicon';

export interface FaviconProcessor {
  generateUrl: (url: string) => Favicon;
}
