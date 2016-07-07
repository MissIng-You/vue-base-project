// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production-vs'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
//var csprojFilePath = path.resolve(__dirname, '../../WjDeviceCloud.csproj')
//var csprojFile =  cat(csprojFilePath)
//var grepFile = grep('Content', csprojFilePath)
//
//var resolvePath = path.resolve(__dirname, '../dist')
//
//var allfiles = ls('-R' ,resolvePath)
//var contentsfiles = grepFile
//
//allfiles.forEach(function(item, index){
//  var temp = '\t<Content Include="' + item + '" /> \n\r'
//  contentsfiles += temp
//})
//
//echo(contentsfiles)
//
//csprojFile.replace(grepFile, contentsfiles)

//echo(contentsfiles)

echo('copy files starting ...')
set('-v')
//rm('-rf', assetsPath)
//mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: true,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n')
})

