const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const package = require('./package.json');

module.exports = () => {
  const config = {
    context: `${__dirname}/src`,
    devtool: 'source-map',
    entry: {
      background: './background.js',
      newtab: './newtab',
    },
    module: {
      rules: [
        {
          include: path.join(__dirname, 'src', 'components'),
          test: /\.css$/,
          use: [
            'style-loader',
            '@teamsupercell/typings-for-css-modules-loader',
            {
              loader: 'css-loader',
              options: {
                localsConvention: 'camelCaseOnly',
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
          use: [
            'svg-url-loader', // or file-loader or svg-url-loader
            'svg-transform-loader',
          ],
        },
        {
          exclude: /node_modules/,
          loader: 'ts-loader',
          test: /\.tsx?$/,
        },
      ],
    },
    name: 'client',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv(),
      new LiveReloadPlugin(),
      new CopyWebpackPlugin([
        {
          from: './manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());

            manifest.author = package.author.name;
            manifest.homepage_url = package.homepage;
            manifest.version = package.version;
            manifest.version_name = `${package.version} (DP)`;
            manifest.content_security_policy = `${manifest.content_security_policy} script-src-elem 'self' http://localhost:35729;`;

            return JSON.stringify(manifest, null, 2);
          },
        },
        { from: './logo.png' },
      ], {
        copyUnmodified: true,
      }),
      new webpack.WatchIgnorePlugin([
        /css\.d\.ts$/,
      ]),
      new HtmlWebpackPlugin({
        chunks: ['newtab'],
        filename: 'newtab.html',
        hash: true,
        inject: 'body',
        liveReload: {
          enabled: true,
          scriptUrl: 'http://localhost:35729/livereload.js',
        },
        template: './newtab.ejs',
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    target: 'web',
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    },
  };

  return config;
};
