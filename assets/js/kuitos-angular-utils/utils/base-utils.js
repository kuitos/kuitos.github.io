/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-21
 */
;
(function (angular, undefined) {

  'use strict';

  var _services = {};

  // 性能工具
  var PerformanceUtils = {

    /**
     * 函数只会在确定时间延时后才会被触发(只会执行间隔时间内的最后一次调用)
     */
    debounce: function (func, delay, scope, invokeApply) {
      var $timeout = _services.$timeout,
        timer;

      return function debounced() {
        var context = scope,
          args = arguments;

        $timeout.cancel(timer);
        timer = $timeout(function () {

          timer = undefined;
          func.apply(context, args);

        }, delay || 300, invokeApply);
      };
    },

    /**
     * 函数节流。使一个持续性触发的函数执行间隔大于指定时间才会有效(只会执行间隔时间内的第一次调用)
     */
    throttle: function throttle(func, delay, context) {
      var recent;
      return function throttled() {
        var now = Date.now();
        context = context || null;

        if (!recent || (now - recent > (delay || 10))) {
          func.apply(context, arguments);
          recent = now;
        }
      };
    }
  };

  angular
    .module('ngUtils.utils.baseUtils', [])
    .constant('baseUtils', {
      PerformanceUtils: PerformanceUtils
    })
    .run(['$timeout', function ($timeout) {
      _services.$timeout = $timeout;
    }]);

})(window.angular);

