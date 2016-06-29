var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main.js',
    //map: ['./src/shared/dojo.map.config.js', './src/vendor/arcgis/init.js', './src/shared/map/map.init.js'],
    vendor: ['vue']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'shared': path.resolve(__dirname, '../src/shared'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'esri': path.resolve(__dirname, '../src/vendor/arcgis/esri'),
      'esri4': path.resolve(__dirname, '../src/vendor/arcgis-js-api'),
      'dojo': path.resolve(__dirname, '../src/vendor/arcgis/dojo/dojo.js')
    },
    modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    noParse: [/vendor/],
    externals: {
      'vue': 'Vue'
    },
    preLoaders: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules|bower_components|vendor|shared/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: projectRoot,
        exclude: /node_modules|bower_components|vendor/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules|bower_components|vendor/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
