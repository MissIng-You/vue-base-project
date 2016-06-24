var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders()
  },
  // eval-source-map is faster for development
  devtool: '#cheap-source-map',
  plugins: [
    new CopyWebpackPlugin([
      //{from: 'src/shared', to: 'vendor'},
      //{from: 'src/vendor/arcigs/esri/nls/jsapi_zh-cn.js', to: 'vendor/arcigs/esri/nls/jsapi_zh-cn.js'},
      //{from: 'src/vendor/arcgis/dojox/gfx/svg.js', to: 'vendor/arcgis/dojox/gfx/svg.js'},
      //{from: 'src/dojo/resources/blank.gif', to: 'vendor/dojo/resources/blank.gif'},
      //{from: 'src/vendor/arcgis/init.js', to: 'vendor/arcgis/init.js'}
      {from: 'src/api', to: 'api'}
    ]),
    //new webpack.IgnorePlugin(/\.\/jquery.js$/),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.ProvidePlugin({
      //$: "jquery",
      //jQuery: "jquery",
      //"window.jQuery": "jquery"
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
