/* globals __dirname */
const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  context: base.context,
  module: {
    rules: base.module.rules.concat([
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ])
  },
  resolve: base.resolve,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
      'process.env.SKIP_BC': JSON.stringify(process.env.SKIP_BC || false),
      'process.env.FAIL_ON_WARNINGS': JSON.stringify(process.env.FAIL_ON_WARNINGS || false)
    })
  ],
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  }
};
