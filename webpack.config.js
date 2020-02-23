const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { HotModuleReplacementPlugin } = webpack;
const port = 3000;
const context = __dirname + '/src';

module.exports = (env, argv) => {
  const config = {
    name: 'client',
    target: 'web',
    context,
    entry: {
      app: [
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        './index'
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devtool: argv.mode === 'production' ? 'source-map' : 'cheap-eval-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
        filename: 'index.html',
        inject: 'body'
      }),
      new HotModuleReplacementPlugin()
    ]
  };

  if (argv.mode === 'development') {
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    };
  }

  return config;
};
