/* global $ */
'use strict';

angular.module('portfolioApp')
  .directive('ngScroll', function () {
    return {
      link: function (scope, element, attrs) {
        $(element).perfectScrollbar();
      }
    };
  });
