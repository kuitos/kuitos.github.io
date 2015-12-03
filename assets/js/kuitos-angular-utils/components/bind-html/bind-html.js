/**
 * @author kui.liu
 * @since 2014/12/26 下午5:15
 * 类似ng-bind-html，只是这里嵌入的html支持angular指令(有一个compile过程)而不是纯静态html
 */
;
(function (angular, undefined) {
  "use strict";

  angular.module("ngUtils.components.bindHtml", [])

    .directive("bindHtml", ["$compile", function ($compile) {

      return {
        restrict: "A",
        link    : function (scope, element, attr) {

          scope.$watch(function (scope) {
            return scope.$eval(attr.bindHtml);
          }, function (newTpl) {

            element.html(newTpl);
            $compile(element.contents())(scope);

          });
        }
      };

    }]);
})(window.angular);