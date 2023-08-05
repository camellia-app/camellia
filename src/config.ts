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

assertEnvironmentVariable(
  process.env['UNSPLASH_DEFAULT_COLLECTION_ID'],
  'Environment variable UNSPLASH_DEFAULT_COLLECTION_ID should be defined',
);

const isDevelopment = process.env['NODE_ENV'] !== 'production';

export const config = {
  appVersion: process.env['APP_VERSION'],
  isDevelopment: isDevelopment,
  sentry: {
    dsn: process.env['SENTRY_DSN'],
    environment: isDevelopment ? 'development' : 'production',
    release: process.env['SENTRY_RELEASE'],
    tracing: {
      sampleRate: isDevelopment ? 1 : 0.1,
    },
  },
  unsplash: {
    bridge: {
      baseHost: new URL(process.env['UNSPLASH_BRIDGE_BASE_HOST']),
    },
    defaultCollectionId: process.env['UNSPLASH_DEFAULT_COLLECTION_ID'],
  },
  websiteIconsProxy: {
    baseHost: new URL(process.env['WEBSITE_ICONS_PROXY_BASE_HOST']),
  },
};
