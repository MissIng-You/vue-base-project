//#region
/*
 * Dojo 配置文件
 *
 * @module Config
 * @author Hxd
 *
 */
//#endregion


window.dojoConfig = {
    //// 应用程序路径
    //appDir: '/',

    //dir: '/dist',

    // 根路径，若设置appDir，则是相对于appDir的路径
    baseUrl: '../',

    // 超时等待
    waitSeconds: 20,

    // 允许异步加载
    async: true,

    // 提供必然支持能力
    has: {
        'dojo-firebug': true,
        'dojo-debug-message': true
    },

    // 不解析页面小组件
    parseOnLoad: false,

    // 获取最新资源，即不记录缓存
    cacheBust: false,

    // 国际化
    //locale: location.search.match(/locale=([\w\-]+)/) ? RegExp.$1 : "zh-cn",

    // 包路径
    packages: [{
        // ArcGis - esri 文件夹
        name: 'esri',
        location: '/vendor/arcigs/esri'
    }, {
        // ArcGis - dojo 文件夹
        name: 'dojo',
        location: '/vendor/arcgis/dojo'
    }, {
        // ArcGis - dojox 文件夹
        name: 'dojox',
        location: '/vendor/arcgis/dojox'
    }, {
        // ArcGis - dijit 文件夹
        name: 'dijit',
        location: '/vendor/arcgis/dijit'
    }, {
        // ArcGis - dgrid 文件夹
        name: 'dgrid',
        location: '/vendor/arcgis/dgrid'
    }, {
        // ArcGis - xstyle 文件夹
        name: 'xstyle',
        location: '/vendor/arcgis/xstyle'
    }, {
      // Shared - map 文件夹
      name: 'map',
      location: '/vendor/map'
    }]
};

exports.config = {
  dojoConfig: window.dojoConfig
}
//var locationPath = location.pathname.replace(/\/[^\/]+$/, '');
//
//window.dojoConfig = {
//  async: true,
//  parseOnLoad: true,
//  deps: ['app/main'],
//  packages: [{
//    name: 'vue',
//    location: locationPath + '/node_modules/vue/',
//    main: 'vue'
//  },{
//    name: 'react-dom',
//    location: locationPath + '/bower_components/react/',
//    main: 'react-dom'
//  }, {
//    name: 'react-bootstrap',
//    location: locationPath + '/bower_components/react-bootstrap',
//    main: 'react-bootstrap'
//  },{
//    name: 'app',
//    location: locationPath + '/dist',
//    main: 'main'
//  }]
//};
