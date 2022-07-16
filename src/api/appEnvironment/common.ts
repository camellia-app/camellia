export type AppEnvironment = {
  /** @deprecated */
  app: {
    /** @deprecated */
    name: string;
    /** @deprecated */
    version: string;
  };
  browser: {
    name: string;
    version: string;
  };
  platform: {
    arch: string;
    os: string;
  };
};
