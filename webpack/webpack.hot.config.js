const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      base.entry
    ]
  },
  output: base.output,
  resolve: base.resolve,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(base.plugins),
  module: base.module,
  devtool: 'eval-source-map',
  externals: base.externals
};
