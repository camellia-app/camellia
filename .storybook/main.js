module.exports = {
  stories: ['./stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-measure',
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    config.resolve.alias.mdi = '@material-design-icons/svg';

    // We are disabling default Storybook CSS rules for our CSS modules
    // see https://stackoverflow.com/questions/70042915/how-to-use-css-modules-with-storybook-6
    config.module.rules.find((rule) => rule.test.toString() === '/\\.css$/').exclude = /\.module\.css$/;

    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[local]--[hash:base64:5]',
              namedExport: true,
              exportLocalsConvention: 'camelCaseOnly',
              exportOnlyLocals: false,
            },
            importLoaders: 1,
          },
        },
      ],
    });

    // NOTE: We are disabling default Storybook file-loader only for SVG files
    // because we need to register our own SVG loader (svg-transform-loader)
    // Code below was taken from https://github.com/storybookjs/storybook/issues/6188#issuecomment-654884130
    const fileLoaderRule = config.module.rules.find((rule) => !Array.isArray(rule.test) && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
      type: 'asset/inline',
      use: ['svg-transform-loader'],
    });

    // For some reason it does not recognize TypeScript syntax without it.
    // TODO: investigate why Storybook does not work without this rule
    config.module.rules.push({
      exclude: /node_modules/,
      loader: 'ts-loader',
      test: /\.tsx?$/,
    });

    // Return the altered config
    return config;
  },
};
