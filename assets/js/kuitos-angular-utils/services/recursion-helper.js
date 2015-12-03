/**
 * @author Kuitos
 * @homepage https://github.com/kuitos
 * @since 7/29/15. 11:42
 */
;
(function (angular, undefined) {
  "use strict";

  angular
    .module("ticket.services.recursionHelper", [])
    .factory("recursionHelper", RecursionHelper);

  /**
   * 递归指令服务
   * thanks for http://stackoverflow.com/questions/14430655/recursion-in-angular-directives
   */
  RecursionHelper.$inject = ["$compile"];
  function RecursionHelper($compile) {

    return {
      /**
       * Manually compiles the element, fixing the recursion loop.
       * @param element
       * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
       * @returns {pre: *, post: Function} object containing the linking functions.
       */
      compile: function (element, link) {
        // Normalize the link parameter
        if (angular.isFunction(link)) {
          link = {post: link};
        }

        // Break the recursion loop by removing the contents
        var contents = element.contents().remove();
        var compiledContents;

        return {

          pre : (link && link.pre) ? link.pre : null,
          /**
           * Compiles and re-adds the contents
           */
          post: function (scope, element) {

            // Compile the contents
            if (!compiledContents) {
              compiledContents = $compile(contents);
            }

            // Re-add the compiled contents to the element
            compiledContents(scope, function (clone) {
              element.append(clone);
            });

            // Call the post-linking function, if any
            if (link && link.post) {
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }

})(window.angular);