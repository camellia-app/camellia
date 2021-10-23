import { camelliaProxyFaviconProcessor } from './camelliaProxyFaviconProcessor';
import { FaviconProcessor } from './faviconProcessor';

export const getFaviconProcessor = (): FaviconProcessor => {
  return camelliaProxyFaviconProcessor;
};
