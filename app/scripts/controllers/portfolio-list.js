'use strict';

angular.module('portfolioApp')
  .controller('PortfolioListCtrl', function ($scope, Projects, Animation) {
    $scope.projects = Projects.getProjects();
    $scope.animation = Animation.getAnimation();

    $scope.animate = function (animation) {
      $scope.animation = animation + '-animation';
      Animation.setAnimation($scope.animation);
    };
  });
