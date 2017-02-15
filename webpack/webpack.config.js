/* globals __dirname */
const path = require('path');
const merge = require('lodash/merge');
const filter = require('lodash/filter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const baseContext = path.join(__dirname, '../src');
const isProd = process.env.NODE_ENV === 'production';

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

const CSS_IMPORT = `css?sourceMap&modules&importLoaders=1
  &localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass`;

module.exports = {
  context: baseContext,
  entry: '../src/application.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    root: baseContext,
    alias: merge({
      styles: path.resolve(__dirname, '../src/styles'),
      utils: path.resolve(__dirname, '../src/utils')
    }, developmentModules),
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loader: 'babel-loader?plugins[]=transform-object-rest-spread',
        includes: [baseContext],
        exclude: /node_modules/
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', CSS_IMPORT)
      },
      {
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        includes: [baseContext],
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
    new ExtractTextPlugin('react-toolbox.css', { allChunks: true })
  ],
};
