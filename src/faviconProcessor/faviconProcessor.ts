import { camelliaProxyFaviconProcessor } from './camelliaProxyFaviconProcessor';
import { Favicon } from './favicon';

export interface FaviconProcessor {
  generateUrl: (url: string) => Favicon;
}

export const getFaviconProcessor = (): FaviconProcessor => {
  return camelliaProxyFaviconProcessor;
};
