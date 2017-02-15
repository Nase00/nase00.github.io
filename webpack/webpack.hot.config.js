const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: {
    app: [
      'webpack-hot-middleware/client',
      base.entry
    ]
  },
  output: base.output,
  resolve: base.resolve,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(base.plugins),
  module: base.module,
  sassLoader: base.sassLoader,
  devtool: 'eval-source-map',
  debug: true,
  externals: base.externals
};
