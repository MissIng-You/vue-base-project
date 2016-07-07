// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var buildNormal = {
  env: require('./prod.env'),
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: true
}

var buildVs = {
  env: require('./prod-vs.env'),
  index: path.resolve(__dirname, '../../Views/Home/Index.cshtml'),
  assetsRoot: path.resolve(__dirname, '../../wwwroot'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/wwwroot/',
  productionSourceMap: true
}

var build = process.env.NODE_ENV === 'production-vs'
  ? buildVs
  : buildNormal

module.exports = {
  build: build,
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {}
  }
}
