/**
 * @author kui.liu
 * @since 2014/10/10 下午5:52
 * http处理器，用于设定全局http配置，包括loading状态切换，拦截器配置，超时时间配置等
 * 基于rest api可以构建超强http缓存中间件
 */
;
(function (angular, undefined) {
  "use strict";

  // 模拟service的私有服务
  var _app = {};

  angular.module("ngUtils.services.httpHandler", [])

    /* http处理器黑名单列表(该列表中的url不走httpHandler拦截器) */
    .constant('httpHandlerBlacklist', [])

    .config(["$httpProvider", 'httpHandlerBlacklist', function ($httpProvider, httpHandlerBlacklist) {

      var GET = 'GET',
        /** http请求相关状态(loading)切换 */
        count = 0,
        loading = false,

        stopLoading = function () {
          loading = false;
          _app.isLoading(false); // end loading
        };

      function isInHttpBlackList(url) {

        return httpHandlerBlacklist.some(function (blackUrl) {
          return url.test(blackUrl);
        });

      }

      /*************************** http超时时间设为30s ***************************/
      $httpProvider.defaults.timeout = 30 * 1000;
      /*************************** 禁用浏览器缓存 ***************************/
      $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
      /* 广告时间哈哈.... */
      $httpProvider.defaults.headers.common["X-Requested-With"] = "https://github.com/kuitos";

      /******************** http拦截器，用于统一处理错误信息、消息缓存、请求响应状态、响应结果处理等 **********************/
      $httpProvider.interceptors.push(["$q", "$log", "$timeout", "$cacheFactory", '$injector',
        function ($q, $log, $timeout, $cacheFactory, $injector) {

          // 清除cache
          function clearCache(config, key) {
            (angular.isObject(config.cache) ? config.cache : $cacheFactory.get("$http"))[key ? 'remove' : 'removeAll'](key);
          }

          return {

            request: function (config) {

              // 不在黑名单中的url才进拦截器
              if (!isInHttpBlackList(config.url)) {

                count++;

                if (!loading) {

                  // loading start
                  $timeout(function () {
                    if (!loading && count > 0) {
                      loading = true;
                      _app.isLoading(true);
                    }
                  }, 500); // if no response in 500ms, begin loading
                }

              }

              /**
               * 查询请求中含有私有参数_forceRefresh时也需要强制刷新
               */
              if (config.method === GET && config.params && config.params._forceRefresh) {
                clearCache(config);
              }

              return config;
            },

            requestError: function (rejection) {
              $log.error("%s 接口请求失败!", rejection.url);
              return $q.reject(rejection);
            },

            response: function (res) {
              var config = res.config;

              if (!isInHttpBlackList(config.url)) {

                count--;

                // 响应结束，清除相关状态
                if (count === 0) {
                  if (loading) {
                    stopLoading();
                  }
                }

                /**
                 * 若请求为非查询操作(save,update,delete等更新操作)，成功后需要重新刷新cache(清空对应cache)。默认cache为$http
                 */
                if (config.method !== GET && config.cache) {
                  clearCache(config);
                }
              }

              return res;
            },

            responseError: function (rejection) {

              var config = rejection.config;

              if (!isInHttpBlackList(config.url)) {

                count--;
                // 响应结束，清除相关状态
                if (count === 0) {
                  if (loading) {
                    stopLoading();
                  }
                }

                // 清理相应缓存
                if (config.cache) {
                  clearCache(config, config.url);
                }

                // 失败弹出错误提示信息
                // 这里通过$injector.get()的方式获取tipsHandler服务，而不是直接注入tipsHandler的方式，是因为tipsHandler实例可能是依赖于$http的服务(如tipsHandler内部会请求模板)
                // 如果存在这种循环依赖，angular会抛出cdep(Circular dependency found)异常
                $injector.get('tipsHandler').error(rejection.data || "请求错误!");
                $log.error("接口 %s 请求错误! 状态：%s 错误信息：%s", config.url, rejection.status, rejection.statusText);

              }

              return $q.reject(rejection);
            }
          }
        }]);
    }])

    /* 提示信息provider，用于配置错误提示处理器 **/
    .provider("tipsHandler", function () {

      var _tipsHandler = {
          error  : angular.noop,
          warning: angular.noop,
          success: angular.noop
        },

        _configuredTipsHandler;

      /**
       * 设置具体的tips处理器
       * @param tipsHandler {String|Object} String:service Object:handler instance
       */
      this.setTipsHandler = function (tipsHandler) {
        _configuredTipsHandler = tipsHandler;
      };

      this.$get = ['$injector', '$log', function ($injector, $log) {

        var verifiedTipsHandler;

        if (angular.isString(_configuredTipsHandler)) {

          try {
            verifiedTipsHandler = $injector.get(_configuredTipsHandler);
          } catch (err) {
            $log.error('%s服务未被正常初始化(%s服务get失败)', _configuredTipsHandler, _configuredTipsHandler);
          }

        } else if (angular.isFunction(_configuredTipsHandler) || angular.isArray(_configuredTipsHandler)) {

          try {
            verifiedTipsHandler = $injector.invoke(_configuredTipsHandler);
          } catch (err) {
            $log.error('%s服务未被正常初始化(%s服务invoke失败)', _configuredTipsHandler, _configuredTipsHandler);
          }

        } else if (angular.isObject(_configuredTipsHandler)) {
          verifiedTipsHandler = _configuredTipsHandler;
        }

        return angular.extend(_tipsHandler, verifiedTipsHandler);
      }];

    })

    .run(["$rootScope", function ($rootScope) {

      /** loading状态切换 **/
      _app.isLoading = function (flag) {
        $rootScope.loading = flag;
      };

    }]);

})(window.angular);
