
/*
 * 测试Wj.map.init.js脚本的可用性
 *
 * @module wj.map.test
 * @author hxd
 *
 */

//#region 对象初始化

require(['map/map.mini', 'dojo/domReady!'], function (mapIndex) {

    // 初始化地图
    mapIndex.init();

    // 绑定事件
    mapIndex.onInit();

});

//#endregion
