'use strict';

angular.module('portfolioApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.date = Date.now();
  });
