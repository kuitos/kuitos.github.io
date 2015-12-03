/**
 * @author Kuitos
 * @since 2014/12/04 下午9:39
 */
;
(function (angular, undefined) {
  "use strict";

  angular.module("ngUtils.components.validate", ["ngUtils.services.localeValidation", "ngUtils.services.baseServices"])

    .constant("INVALID_CLASS", "validate-failed")

    // 通用校验指令
    .directive('uiValidate', function () {

      return {
        restrict: 'A',
        require : 'ngModel',
        link    : function (scope, elm, attrs, ctrl) {
          var validateFn, validators = {},
            validateExpr = scope.$eval(attrs.uiValidate);

          if (!validateExpr) {
            return;
          }

          if (angular.isString(validateExpr)) {
            validateExpr = {validator: validateExpr};
          }

          angular.forEach(validateExpr, function (exprssn, key) {
            validateFn = function (valueToValidate) {
              var expression = scope.$eval(exprssn, {'$value': valueToValidate});
              if (angular.isObject(expression) && angular.isFunction(expression.then)) {
                // expression is a promise
                expression.then(function () {
                  ctrl.$setValidity(key, true);
                }, function () {
                  ctrl.$setValidity(key, false);
                });
                return valueToValidate;
              } else if (expression) {
                // expression is true
                ctrl.$setValidity(key, true);
                return valueToValidate;
              } else {
                // expression is false
                ctrl.$setValidity(key, false);
                return valueToValidate;
              }
            };
            validators[key] = validateFn;
            ctrl.$formatters.push(validateFn);
            ctrl.$parsers.push(validateFn);
          });

          function apply_watch(watch) {
            //string - update all validators on expression change
            if (angular.isString(watch)) {
              scope.$watch(watch, function () {
                angular.forEach(validators, function (validatorFn) {
                  validatorFn(ctrl.$modelValue);
                });
              });
              return;
            }

            //array - update all validators on change of any expression
            if (angular.isArray(watch)) {
              angular.forEach(watch, function (expression) {
                scope.$watch(expression, function () {
                  angular.forEach(validators, function (validatorFn) {
                    validatorFn(ctrl.$modelValue);
                  });
                });
              });
              return;
            }

            //object - update appropriate validator
            if (angular.isObject(watch)) {
              angular.forEach(watch, function (expression, validatorKey) {
                //value is string - look after one expression
                if (angular.isString(expression)) {
                  scope.$watch(expression, function () {
                    validators[validatorKey](ctrl.$modelValue);
                  });
                }

                //value is array - look after all expressions in array
                if (angular.isArray(expression)) {
                  angular.forEach(expression, function (intExpression) {
                    scope.$watch(intExpression, function () {
                      validators[validatorKey](ctrl.$modelValue);
                    });
                  });
                }
              });
            }
          }

          // Support for ui-validate-watch
          if (attrs.uiValidateWatch) {
            apply_watch(scope.$eval(attrs.uiValidateWatch));
          }
        }
      };
    })

    // 生成校验提示结果
    .directive('genTooltip', ["$timeout", "$compile", "isVisible", "$position", "INVALID_CLASS", function ($timeout, $compile, isVisible, $position, INVALID_CLASS) {
      var toolTipTemplate = '<div class="tooltip right fade in">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="tooltip-inner"></div>' +
        '</div>';

      return {
        require: '?ngModel',
        link   : function (scope, element, attr, ngModel) {

          var enable = false,
            options = scope.$eval(attr.genTooltip) || {},
            tooltipElement,
            tooltipContent,
            popupTimeout;

          attr.msg = scope.$eval(attr.tooltipMsg) || {};

          // use for AngularJS validation
          if (options.validate) {

            if (ngModel) {
              ngModel.$formatters.push(validateFn);
              ngModel.$parsers.push(validateFn);
            } else {
              scope.$watch(function () {
                return attr.dataOriginalTitle || attr.originalTitle;
              }, showTooltip);
            }

            element.bind('focus', function () {
              // 开启校验
              if (!enable) {
                enable = true;
              }
              // 执行校验
              validateFn();
            });

            scope.$on('genTooltipValidate', function (event, collect, turnoff) {
              enable = !turnoff;
              if (ngModel) {
                if (angular.isArray(collect)) {
                  collect.push(ngModel);
                }
                invalidMsg(ngModel.$invalid);
              }
            });
          }

          scope.$on("$destroy", function () {
            $timeout.cancel(popupTimeout);
            element.unbind("focus");
          });

          function positionTooltip() {

            var ttPosition = $position.positionElements(element, tooltipElement, "right", false);
            ttPosition.top += 'px';
            ttPosition.left += 'px';
            tooltipElement.css(ttPosition);

            popupTimeout && (popupTimeout = null);
          }

          function showTooltip(show, title) {

            if (show) {

              if (title) {

                if (!tooltipElement) {

                  tooltipElement = angular.element(toolTipTemplate);
                  tooltipContent = angular.element(tooltipElement.find("div")[1]);

                  positionTooltip();
                  if (!popupTimeout) {
                    // to position correctly, we need reposition the tooltip after draw
                    popupTimeout = $timeout(positionTooltip, 0, false);
                  }

                  element.after(tooltipElement);
                }

                tooltipContent.text(title);
              }

              element.addClass(INVALID_CLASS);

            } else {

              if (tooltipElement) {
                tooltipElement.remove();
                tooltipElement = null;
              }
              element.removeClass(INVALID_CLASS);
            }
          }

          function invalidMsg(invalid) {
            ngModel.validate = enable && options.validate && isVisible(element);
            if (ngModel.validate) {
              var title = attr.showTitle && (ngModel.$name && ngModel.$name + ' ') || '';
              var msg = scope.$eval(attr.tooltipMsg) || {};
              if (invalid && options.validateMsg) {
                angular.forEach(ngModel.$error, function (value, key) {
                  if (attr.msg[key]) {
                    title += (value && msg[key] && msg[key] + ', ') || '';
                  } else if (options.validateMsg[key]) {
                    title += (value && options.validateMsg[key] && options.validateMsg[key] + ', ') || '';
                  }
                });
              }
              title = title.slice(0, -2) || '';
              showTooltip(!!invalid, title);
            } else {
              showTooltip(false, '');
            }
          }

          function validateFn(value) {
            $timeout(function () {
              invalidMsg(ngModel.$invalid);
            });
            return value;
          }

        }
      }
    }])

    // 元素是否可见
    .factory("isVisible", function () {
      return function (element) {
        var rect = element[0].getBoundingClientRect();
        return Boolean(rect.bottom - rect.top);
      };
    })

    // steal from ui.bootstrap
    .factory('$position', ['$document', '$window', function ($document, $window) {

      function getStyle(el, cssprop) {
        if (el.currentStyle) { //IE
          return el.currentStyle[cssprop];
        } else if ($window.getComputedStyle) {
          return $window.getComputedStyle(el)[cssprop];
        }
        // finally try and get inline style
        return el.style[cssprop];
      }

      /**
       * Checks if a given element is statically positioned
       * @param element - raw DOM element
       */
      function isStaticPositioned(element) {
        return (getStyle(element, 'position') || 'static' ) === 'static';
      }

      /**
       * returns the closest, non-statically positioned parentOffset of a given element
       * @param element
       */
      var parentOffsetEl = function (element) {
        var docDomEl = $document[0];
        var offsetParent = element.offsetParent || docDomEl;
        while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docDomEl;
      };

      return {
        /**
         * Provides read-only equivalent of jQuery's position function:
         * http://api.jquery.com/position/
         */
        position: function (element) {
          var elBCR = this.offset(element);
          var offsetParentBCR = {top: 0, left: 0};
          var offsetParentEl = parentOffsetEl(element[0]);
          if (offsetParentEl != $document[0]) {
            offsetParentBCR = this.offset(angular.element(offsetParentEl));
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
          }

          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width : boundingClientRect.width || element.prop('offsetWidth'),
            height: boundingClientRect.height || element.prop('offsetHeight'),
            top   : elBCR.top - offsetParentBCR.top,
            left  : elBCR.left - offsetParentBCR.left
          };
        },

        /**
         * Provides read-only equivalent of jQuery's offset function:
         * http://api.jquery.com/offset/
         */
        offset: function (element) {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width : boundingClientRect.width || element.prop('offsetWidth'),
            height: boundingClientRect.height || element.prop('offsetHeight'),
            top   : boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
            left  : boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
          };
        },

        /**
         * Provides coordinates for the targetEl in relation to hostEl
         */
        positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

          var positionStrParts = positionStr.split('-');
          var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

          var hostElPos,
            targetElWidth,
            targetElHeight,
            targetElPos;

          hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

          targetElWidth = targetEl.prop('offsetWidth');
          targetElHeight = targetEl.prop('offsetHeight');

          var shiftWidth = {
            center: function () {
              return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left  : function () {
              return hostElPos.left;
            },
            right : function () {
              return hostElPos.left + hostElPos.width;
            }
          };

          var shiftHeight = {
            center: function () {
              return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top   : function () {
              return hostElPos.top;
            },
            bottom: function () {
              return hostElPos.top + hostElPos.height;
            }
          };

          switch (pos0) {
            case 'right':
              targetElPos = {
                top : shiftHeight[pos1](),
                left: shiftWidth[pos0]()
              };
              break;
            case 'left':
              targetElPos = {
                top : shiftHeight[pos1](),
                left: hostElPos.left - targetElWidth
              };
              break;
            case 'bottom':
              targetElPos = {
                top : shiftHeight[pos0](),
                left: shiftWidth[pos1]()
              };
              break;
            default:
              targetElPos = {
                top : hostElPos.top - targetElHeight,
                left: shiftWidth[pos1]()
              };
              break;
          }

          return targetElPos;
        }
      };
    }])

    /* ******************************** validation init ******************************** */
    .run(["$rootScope", "$locale", "app", function ($rootScope, $locale, app) {

      /** rootScope全局初始化 **/
      $rootScope.validateTooltip = {
        validate   : true,
        validateMsg: $locale.VALIDATE
      };

      /** 表单校验通用方法 **/
      app.validate = function (scope, turnoff) {
        var collect = [],
          error = [];
        scope.$broadcast('genTooltipValidate', collect, turnoff);

        angular.forEach(collect, function (value) {
          if (value.validate && value.$invalid) {
            error.push(value);
          }
        });

        if (error.length === 0) {
          app.validate.errorList = null;
          scope.$broadcast('genTooltipValidate', collect, true);
        } else {
          app.validate.errorList = error;
        }
        return !app.validate.errorList;
      };

    }]);

})(window.angular);