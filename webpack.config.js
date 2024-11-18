/* eslint-disable @typescript-eslint/no-var-requires */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateFileWebpackPlugin = require('create-file-webpack');
const dotenv = require('dotenv');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

const dotenvPath = path.resolve(process.cwd(), '.env');
const dotenvDistPath = path.resolve(process.cwd(), '.env.dist');

if (!fs.existsSync(dotenvPath)) {
  console.info('File ".env" is missing, making a copy from ".env.dist"');

  fs.copyFileSync(dotenvDistPath, dotenvPath);
}

dotenv.config();

assert(process.env.NODE_ENV, 'Environment variable NODE_ENV is not defined');
assert(process.env.APP_VERSION, 'Environment variable APP_VERSION is not defined');
assert(process.env.TARGET_PLATFORM, 'Environment variable TARGET_PLATFORM is not defined');
assert(process.env.UNSPLASH_BRIDGE_BASE_HOST, 'Environment variable UNSPLASH_BRIDGE_BASE_HOST is not defined');

if (process.env.BROWSERSLIST_ENV === undefined) {
  process.env.BROWSERSLIST_ENV = process.env.TARGET_PLATFORM;
}

const buildExtensionManifest = () => {
  let extensionManifest = {
    author: 'Petr Flaks',
    chrome_url_overrides: {
      newtab: '/newtab.html',
    },
    content_security_policy: {
      extension_pages:
        "script-src 'self'; object-src 'none'; connect-src https://*.camellia.app https://*.ingest.sentry.io",
    },
    default_locale: 'en',
    description: '__MSG_extensionDescription__',
    homepage_url: 'https://camellia.app',
    host_permissions: ['https://*.camellia.app/'],
    manifest_version: 3,
    name: 'Camellia',
    options_ui: {
      open_in_tab: true,
      page: 'options.html',
    },
    permissions: ['bookmarks', 'storage'],
    short_name: 'Camellia',
    version: process.env.APP_VERSION.replace(/.*?([0-9]+\.[0-9]+\.[0-9]+).*/, '$1'),
  };

  switch (process.env.TARGET_PLATFORM) {
    case 'chromium':
      extensionManifest.background = {};
      extensionManifest.background.service_worker = '/background.js';
      extensionManifest.icons = {
        16: 'logo_16x16.png',
        32: 'logo_32x32.png',
        48: 'logo_48x48.png',
        128: 'logo_128x128.png',
      };
      extensionManifest.minimum_chrome_version = '105';
      extensionManifest.offline_enabled = true;
      extensionManifest.permissions = [...extensionManifest.permissions, 'favicon'];
      extensionManifest.version_name = process.env.APP_VERSION;

      break;

    case 'webext':
      extensionManifest.background = {};
      extensionManifest.background.scripts = ['/background.js'];
      extensionManifest.browser_specific_settings = {};
      extensionManifest.browser_specific_settings.gecko = {};
      extensionManifest.browser_specific_settings.gecko.id = 'firefox@camellia.app';
      extensionManifest.browser_specific_settings.gecko.strict_min_version = '121.0';
      extensionManifest.icons = {
        16: 'logo.svg',
      };

      break;
  }

  if (process.env.NODE_ENV !== 'production') {
    extensionManifest.name = `${extensionManifest.name} (${process.env.NODE_ENV})`;
  }

  return extensionManifest;
};

const getCssLoaders = () => {
  const loaders = [];

  loaders.push('style-loader');

  if (process.env.NODE_ENV === 'development') {
    loaders.push({
      loader: 'dts-css-modules-loader',
      options: {
        dropEmptyFile: true,
        namedExport: true,
      },
    });
  }

  loaders.push({
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        exportGlobals: true,
        exportLocalsConvention: 'camelCaseOnly',
        exportOnlyLocals: false,
        localIdentName: '[local]--[hash:base64:5]',
        mode: 'local',
        namedExport: true,
      },
    },
  });

  loaders.push('postcss-loader');

  return loaders;
};

const commonConfig = {
  context: path.join(__dirname, 'src'),
  devtool: false,
  entry: {
    background: './backgroundScript/background.ts',
    newtab: './components/NewtabPage/NewtabPage.tsx',
    options: './components/OptionsPage/OptionsPage.tsx',
  },
  experiments: {
    topLevelAwait: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        issuer: /\.tsx?$/,
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        // include: path.join(__dirname, 'src', 'components'),
        test: /\.module\.css$/,
        use: getCssLoaders(),
      },
      {
        issuer: /\.css$/,
        test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
        type: 'asset/inline',
        use: ['svg-transform-loader'],
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        test: /\.tsx?$/,
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist', process.env.TARGET_PLATFORM),
  },
  plugins: [
    new DotenvWebpackPlugin({
      systemvars: true,
    }),
    new CreateFileWebpackPlugin({
      content: JSON.stringify(buildExtensionManifest()),
      fileName: 'manifest.json',
      path: path.resolve(__dirname, 'dist', process.env.TARGET_PLATFORM),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'translations'), to: '_locales' },
        { from: './logo.svg' },
        { from: './logo_16x16.png' },
        { from: './logo_32x32.png' },
        { from: './logo_48x48.png' },
        { from: './logo_128x128.png' },
      ],
    }),
    new HtmlWebpackPlugin({
      chunks: ['newtab'],
      filename: 'newtab.html',
      inject: 'body',
      template: './components/NewtabPage/newtab.ejs',
      templateParameters: {
        env: process.env.NODE_ENV,
      },
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      inject: 'body',
      template: './components/OptionsPage/options.ejs',
      templateParameters: {
        env: process.env.NODE_ENV,
      },
    }),
  ],
  resolve: {
    alias: {
      mdi: '@material-design-icons/svg',
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  target: 'web',
};

switch (process.env.NODE_ENV) {
  case 'production':
    commonConfig.plugins.push(
      new SourceMapDevToolPlugin({
        append: false,
        filename: '[file].map',
      }),
    );

    break;

  case 'development':
    commonConfig.devtool = 'inline-source-map';
    commonConfig.mode = 'development';

    commonConfig.watchOptions = {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    };

    break;

  default:
    throw Error('Unknown environment name');
}

module.exports = commonConfig;
