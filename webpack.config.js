/* eslint-disable @typescript-eslint/no-var-requires */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
assert(process.env.BUILD_NUMBER, 'Environment variable BUILD_NUMBER is not defined');
assert(process.env.TARGET_PLATFORM, 'Environment variable TARGET_PLATFORM is not defined');
assert(process.env.UNSPLASH_BRIDGE_BASE_HOST, 'Environment variable UNSPLASH_BRIDGE_BASE_HOST is not defined');

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
  });

  loaders.push('postcss-loader');

  return loaders;
};

const commonConfig = {
  context: path.join(__dirname, 'src'),
  devtool: false,
  entry: {
    newtab: './newtab/Newtab.tsx',
    options: './options/Options.tsx',
    background: './backgroundScript/background.ts',
  },
  experiments: {
    topLevelAwait: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        // include: path.join(__dirname, 'src', 'components'),
        test: /\.module\.css$/,
        use: getCssLoaders(),
      },
      {
        test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
        type: 'asset/inline',
        use: ['svg-transform-loader'],
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist', process.env.TARGET_PLATFORM),
  },
  plugins: [
    new DotenvWebpackPlugin({
      systemvars: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());

            manifest.version = `${process.env.APP_VERSION}.${process.env.BUILD_NUMBER}`;
            manifest.version_name = `${process.env.APP_VERSION} build ${process.env.BUILD_NUMBER}`;
            manifest.background.service_worker = `/background.js`;

            switch (process.env.NODE_ENV) {
              case 'development':
                manifest.name = `${manifest.name} (dev)`;
                manifest.version_name = `${manifest.version_name} (dev)`;
                manifest.content_security_policy.extension_pages = `${manifest.content_security_policy.extension_pages};`;

                break;

              default:
                break;
            }

            return JSON.stringify(manifest, null, process.env.NODE_ENV === 'development' ? 2 : 0);
          },
        },
        { from: path.resolve(__dirname, 'translations'), to: '_locales' },
        { from: './logo.png' },
      ],
    }),
    new HtmlWebpackPlugin({
      chunks: ['newtab'],
      filename: 'newtab.html',
      inject: 'body',
      template: './newtab/newtab.ejs',
      templateParameters: {
        env: process.env.NODE_ENV,
      },
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      inject: 'body',
      template: './options/options.ejs',
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
