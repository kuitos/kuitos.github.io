(function () {

  'use strict';

  angular.module('ngUtils.services.localeValidation', ["ngLocale"]).
    run(['$locale',
      function ($locale) {
        angular.extend($locale, {
          VALIDATE: {
            required : '必填！',
            number   : "必须为数字！",
            minlength: '太短！',
            maxlength: '太长！',
            min      : '太小！',
            max      : '太大！',
            more     : '太多！',
            email    : 'Email无效！',
            username : '有效字符为汉字、字母、数字、下划线，以汉字或小写字母开头！',
            minname  : '长度应大于5字节，一个汉字3字节！',
            maxname  : '长度应小于15字节，一个汉字3字节！',
            repasswd : '密码不一致！',
            url      : 'URL无效！',
            tag      : '标签错误，不能包含“,”、“，”和“、”'
          }
        });
      }
    ]);
})();

