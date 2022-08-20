function assertEnvironmentVariable(value: unknown, message: string): asserts value is string {
  const isValid = typeof value === 'string' && value !== '';

  if (!isValid) {
    throw new Error(message);
  }
}

assertEnvironmentVariable(
  process.env['UNSPLASH_BRIDGE_BASE_HOST'],
  'Environment variable UNSPLASH_BRIDGE_BASE_HOST should be defined',
);

assertEnvironmentVariable(
  process.env['WEBSITE_ICONS_PROXY_BASE_HOST'],
  'Environment variable WEBSITE_ICONS_PROXY_BASE_HOST should be defined',
);

assertEnvironmentVariable(process.env['APP_VERSION'], 'Environment variable APP_VERSION should be defined');

assertEnvironmentVariable(process.env['NODE_ENV'], 'Environment variable NODE_ENV should be defined');

export const config = {
  appVersion: process.env['APP_VERSION'],
  isDevelopment: process.env['NODE_ENV'] !== 'production',
  unsplash: {
    bridge: {
      baseHost: new URL(process.env['UNSPLASH_BRIDGE_BASE_HOST']),
      mockPhoto: process.env['UNSPLASH_BRIDGE_MOCK_PHOTO'] === '1',
    },
  },
  websiteIconsProxy: {
    baseHost: new URL(process.env['WEBSITE_ICONS_PROXY_BASE_HOST']),
  },
};
