
/*
 * 公用地图创建模块
 *
 * @module wj.map.js
 * @author hxd
 * @sample 实例化地图： map.init(initOptions)
 * @params initOptions : {
 *              id : 'divId',
 *              baseUrl : '地图基础服务地址',
 *              featureUrl : '特征地图服务地址',
 *              mapOptions : {
 *                  // ArcGis 标准Map的选项
 *              },
 *              serviceOptions : {
 *                  // ArcGis 标准MapService的选项
 *              },
 *              featureOptions:{
 *                  // ArcGis 标准FeatureLayer的选项
 *              }
 *         }
 */

//#region 创建地图模块

define(
	['dojo/_base/lang', 'esri/map', 'esri/config', 'esri/layers/FeatureLayer', 'esri/layers/GraphicsLayer', 'esri/layers/ArcGISTiledMapServiceLayer'],
	function (lang, Map, esriConfig, FeatureLayer, GraphicsLayer, ArcGISTiledMapServiceLayer) {
		'use strict';

		var self = {},

			// 配置地图默认选项
			defaults = (function () {
				var that = {};
				// 中心位置选项
				that.pointOptions = {
				    // 默认位置南充同兴镇（墨卡托坐标，可以是经纬度坐标，根据地图服务的不同而不同）11826554.248315409, 3558089.7606848944
				    //x: 11826554.248315409, //11826554.248315409
                    //y: 3577089.7606848944, //3577089.7606848944
					x: 11635559.789890332,
					y: 3304882.1326517696,
					spatialReference: {
						// 默认中国区地图
						wkid: 102100
					}
				};

				// 地图图层选项
				that.graphicsLayerOptions = {
					id: 'wjGraphicsLayer'
				};

				// 特征层选项
				that.featureOptions = {
					// 默认 http://118.122.168.203:8089 下的MapService
					url: 'http://118.122.168.203:8089/ArcGIS/rest/services/SiChuan/MapServer/0',
					others: {
						//id: 'wjFeatrueLayer',
						outFields: ['*']
					}
				};

				// 服务层选项
				that.serviceOptions = {
					// 默认 map.geoq.cn 下的MapService
					url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer',
					others: {
						id: 'wjBaseLayer'
					}
				};

				// 地图选项
				that.mapOptions = {
					// 中心位置
					center: that.pointOptions,
					// 最小显示到国家级别，最大显示到乡级别，正常级别是区域级别，开启渐变缩放
					minZoom: 5,
					//zoom: 12,
					maxZoom: 14,
					fadeOnZoom: true,
					// 去除默认Logo， 以及地图级别
					logo: false,
					slider: false
				};

				return that;
			}());

		// 检查初始化选项
		self._valid = function (initOptions) {
			var opt = initOptions;

			// 所属元素ID和地图服务必须要填
			if (!opt || !opt.id || !opt.baseUrl) return false;

			return true;
		};

		// 组合属性
		self._mixin = function (target, source) {
			return lang.mixin(target, source);
		};

		// 扩展对象
		self._extend = function(ctor, props){
			return lang.extend(ctor, props);
		};

		// 创建服务图层
		self._createServiceLayer = function (initOptions) {
			// 此处不用检查url是否为空，在初始化地图时统一检查
			var
				serviceOptions = self._mixin(initOptions.serviceOptions || {}, defaults.serviceOptions.others),
				tiledMapServiceLayer = new ArcGISTiledMapServiceLayer(initOptions.baseUrl || defaults.serviceOptions.url, serviceOptions);

			console.info('ServiceOptions :' + JSON.stringify(serviceOptions, null, '\t'));

			return tiledMapServiceLayer;
		};

		// 创建特征图层
		self._createFeatureLayer = function (initOptions) {
			// 此处不用检查url是否为空，在初始化地图时统一检查
			var
				featureOptions = self._mixin(initOptions.featureOptions || {}, defaults.featureOptions.others),
				featureLayer = new FeatureLayer(initOptions.featureUrl || defaults.featureOptions.url, featureOptions);

			// v3.9 不支持属性，只能通过setDefinitionExpression方法设置筛选项
			featureLayer.setDefinitionExpression(featureOptions.definitionExpression);

			console.info('FeatureOptions :' + JSON.stringify(featureOptions, null, '\t'));

			return featureLayer;
		};

		// 创建特征图层集合
		self._createFeatureLayers = function (initOptions) {
			var featureLayers = initOptions.featureLayers,
				tempFeatureLayer,
				featureLayersArray = [];

			if(Object.prototype.toString.apply(featureLayers) !== '[object Array]' ||
				!featureLayers || !featureLayers.length) return;

			// 遍历所有特征图层集合
			for(var index = 0, len = featureLayers.length; index < len; index ++){
				tempFeatureLayer = self._createFeatureLayer(featureLayers[index]);
				featureLayersArray.push(tempFeatureLayer);
			}

			return featureLayersArray;
		};

		// 创建图画层
		self._createGraphicsLayer = function () {
			var graphicLayer = new GraphicsLayer(defaults.graphicsLayerOptions);

			return graphicLayer;
		};

		// 创建地图
		self._createMap = function (initOptions) {
			// 此处不用检查url是否为空，在初始化地图时统一检查
			var
				mapOptions = self._mixin(initOptions.mapOptions || {}, defaults.mapOptions),
				map = new Map(initOptions.id, mapOptions);

			console.info('MapOptions :' + JSON.stringify(mapOptions, null, '\t'));

			return map;
		};

	    // 添加图画集合到地图层
	    self._addLayers = function() {
			// 1、第一个参数是Map对象
			// 2、其余参数是Layer对象
			var arrayProto = Array.prototype,
				objectProto = Object.prototype,
				map = arguments[0],
				features = arrayProto.slice.call(arguments,1),
				tempFeature,

				// 添加地图层集合
				addLayers = function(map, layers){
					for(var index = 0, len = layers.length; index < len; index ++) {
						map.addLayer(layers[index]);
					}
				};

			// 3、遍历所有对象
			// 4、数组对象，将使用map.
			for(var index = 0, len = features.length; index < len; index ++) {
				tempFeature = features[index];

				if(objectProto.toString.apply(tempFeature) === '[object Array]'){
					addLayers(map, tempFeature);
				} else{
					map.addLayer(tempFeature);
				}
			}
	    };

		// 实例化地图
		self._initMap = function (initOptions) {
			var
				// 创建服务层
				serviceLayer = self._createServiceLayer(initOptions),

				// 创建特征图层集合
				featureLayers = self._createFeatureLayers(initOptions),

				// 创建图像图层
				graphicsLayer = self._createGraphicsLayer(),

				// 创建地图
				map = self._createMap(initOptions);

			// 添加图层（1.添加基础服务层，2.添加图画层，3.更新图层引用）
			self._addLayers(map, serviceLayer, featureLayers, graphicsLayer);
			map.graphics = map.graphics || graphicsLayer;

			return map;
		};

		// 允许跨域访问
		self._corsDomain = function () {
			console.info(esriConfig.defaults);
			//// 允许访问 map.geoq.cn
			//var corsEnabledServers = esriConfig.defaults.io.corsEnabledServers;

			//corsEnabledServers.push('map.geoq.cn');
			//corsEnabledServers.push('118.122.168.203:8089');
		};

		// 初始化地图
		self.init = function (initOptions) {
			var map;

			// 1.检查配置选项， 2.处理跨域问题， 3.初始化地图
			if (!self._valid(initOptions)) {
				console.warn('initOptions :' + JSON.stringify(initOptions || '', null, '\t') + ' error !');

				return {};
			}

			// 允许跨域访问
			// TODO: 还未解决
			self._corsDomain();

			map = self._initMap(initOptions);

			return map;
		};

		return self;
	});

//#endregion
