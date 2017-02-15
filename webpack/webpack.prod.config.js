/* globals __dirname */
const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  module: base.module,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ].concat(base.plugins),
  devtool: 'cheap-module-source-map'
};
