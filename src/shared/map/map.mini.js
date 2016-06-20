
/*
 * 绘制地图
 *
 * @module 绘制地图
 * @author hxd
 */

//#region 创建小地图定位模块

define(['map/wj.map'],
    function (wjMap) {
        var self = {},
            map;

        // 创建地图
        self._createMap = function () {
            var
             mapOptions = {
                 id: '#world-map',
                 baseUrl: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer',
                 mapOptions: {
                     center: { x: 11635559.789890332, y: 3304882.1326517696, spatialReference: { wkid: 102110 } },
                     zoom: 9,
                     force3DTransforms: true
                 },
                 featureLayers: [{
                     featureUrl: 'http://118.122.168.203:8089/ArcGIS/rest/services/SiChuan/MapServer/1',
                     featureOptions: {
                         definitionExpression: 'NAME = \'高县\''
                     }
                 }, {
                     featureUrl: 'http://118.122.168.203:8089/ArcGIS/rest/services/SiChuan/MapServer/0',
                     featureOptions: {//definitionExpression: 'NAME = \'可久镇\''
                     }
                 }]

             },
             // 初始化通用地图
             map = wjMap.init(mapOptions);

            /// 鼠标变为十字架
            map.setMapCursor('crosshair');

            return map;
        };

        // 初始化地图
        self.init = function () {
            // 创建地图
            map = self._createMap();
        };

        // 事件初始化
        self.onInit = function () { };

        return self;
    });

//#endregion
