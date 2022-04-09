export type AppEnvironment = {
  app: {
    name: string;
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
