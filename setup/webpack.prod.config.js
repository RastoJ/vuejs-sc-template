var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')

module.exports = merge(baseWebpackConfig, {
  entry: './public/src/main.js',
  mode: 'production',
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"prod"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
