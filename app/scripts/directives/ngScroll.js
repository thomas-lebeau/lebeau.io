'use strict';

angular.module('portfolioApp')
  .directive('ngScroll', function () {
    return {
      link: function (scope, element) {
        angular.element(element).perfectScrollbar();
      }
    };
  });
