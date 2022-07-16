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

export const config = {
  unsplash: {
    bridge: {
      baseHost: new URL(process.env['UNSPLASH_BRIDGE_BASE_HOST']),
    },
  },
};
