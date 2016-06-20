
var CommonUtil = CommonUtil || {};

// CommonUtil 下的Transfer模块
CommonUtil.Transfer = (function () {
    var self = {},
        // 默认转换参数
        defaultTransferArg = 20037508.34;

    // 判断是否能够转换
    self.canTransfer = function (obj) {
        if (obj === null || obj === undefined ||
            obj['x'] === undefined || obj['y'] === undefined) return false;

        if (obj['x'] <= 0 || obj['y'] <= 0) return false;

        return true;
    };

    // 经纬转墨卡托
    self.latLng2Mercator = function (latLngObj) {
        var mercatorObj = { x: 0, y: 0 },
            tempMercatorY; // 保存临时Y坐标

        // 获取临时的墨卡托Y坐标
        tempMercatorY = Math.log(Math.tan((90 + (latLngObj.y - 0)) * Math.PI / 360)) / (Math.PI / 180);

        // 获取墨卡托坐标
        mercatorObj['x'] = latLngObj['x'] * defaultTransferArg / 180;
        mercatorObj['y'] = tempMercatorY * defaultTransferArg / 180;

        return mercatorObj;
    };

    // 墨卡托转经纬
    self.mercator2LatLng = function (mercatorObj) {
        var latLngObj = { x: 0, y: 0 },
            tempLatLngY; // 保存临时Y坐标

        // 获取临时的经纬Y坐标
        tempLatLngY = mercatorObj['y'] / defaultTransferArg * 180;

        // 获取经纬坐标
        latLngObj['x'] = mercatorObj['x'] / defaultTransferArg * 180;
        latLngObj['y'] = 180 / Math.PI * (2 * Math.atan(Math.exp(tempLatLngY * Math.PI / 180)) - Math.PI / 2);

        return latLngObj;
    };

    return self;
}());