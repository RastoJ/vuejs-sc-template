var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')

var entry = {
  main: [
    './public/src/main.js',
    'webpack-hot-middleware/client'
  ]
};

// add hot-reload related code to entry chunks
Object.keys(entry).forEach(function (name) {
  entry[name] = ['./setup/dev-client'].concat(entry[name])
})

module.exports = merge(baseWebpackConfig, {
  entry: entry,
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
