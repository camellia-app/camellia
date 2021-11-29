import { camelliaProxyFaviconProcessor } from './camelliaProxyFaviconProcessor';
import type { FaviconProcessor } from './faviconProcessor';

export const getFaviconProcessor = (): FaviconProcessor => {
  return camelliaProxyFaviconProcessor;
};
