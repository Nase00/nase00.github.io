const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      base.entry
    ]
  },
  output: base.output,
  resolve: base.resolve,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ].concat(base.plugins),
  module: base.module,
  devtool: 'inline-source-map',
  externals: base.externals,
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/'
  }
};
