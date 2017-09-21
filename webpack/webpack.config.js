/* globals __dirname */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('lodash/merge');
const filter = require('lodash/filter');
const autoprefixer = require('autoprefixer');
const path = require('path');

const baseContext = path.join(__dirname, '../src');
const testContext = path.join(__dirname, '../tests');

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const aliasSafety = (result, developmentModule) => {
  result[developmentModule] = isProd ? null : developmentModule;

  return result;
};

/**
 * Development-only modules listed here will be aliased to an arbitrary replacement,
 * to prevent them from being used in production.
 */
const developmentModules = filter([
  'redux-devtools',
  'redux-devtools-dock-monitor',
  'redux-devtools-log-monitor',
  'redux-slider-monitor',
  'redux-devtools-chart-monitor',
  'redux-devtools-diff-monitor',
  'redux-devtools-inspector',
  'redux-devtools-dispatch'
].reduce(aliasSafety, {}), (e) => e);

module.exports = {
  context: baseContext,
  entry: '../src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [baseContext, 'node_modules'],
    alias: merge(
      {
        constants: path.resolve(__dirname, '../src/constants'),
        styles: path.resolve(__dirname, '../src/styles'),
        utils: path.resolve(__dirname, '../src/utils')
      },
      developmentModules
    ),
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js(x|)?$/,
        use: {
          loader: 'babel-loader'
        },
        include: [baseContext].concat(isTest ? testContext : []),
        exclude: /node_modules/
      },
      {
        test: /(\.scss|\.css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(svg|png)$/,
        use: {
          loader: 'file-loader'
        },
        include: [baseContext],
        exclude: /node_modules/
      }
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import \'styles/base.scss\';',
    includePaths: [path.resolve(__dirname, '../src')]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../src/index.html'
    }),
  ]
};
