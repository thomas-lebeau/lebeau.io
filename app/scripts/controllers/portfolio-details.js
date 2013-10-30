/* global jQuery */
'use strict';

angular.module('portfolioApp')
  .controller('PortfolioDetailCtrl', function ($scope, $routeParams, $location,Projects, Animation) {

    var projects = Projects.getProjects();
    $scope.animation = Animation.getAnimation();
    var pid = $routeParams.project; // pid is the project slug
    var currentProject = jQuery.grep(projects, function(v) {
      return v.slug === pid;
    });

    // wrong url redirect to root
    // TODO: redirect to 404?
    if (currentProject.length === 0) {
      $location.path('/');
    }

    currentProject = currentProject[0];
    $scope.project = currentProject;

    // find previous and next project
    var currentProjectIndex = jQuery.inArray(currentProject, projects);
    if (currentProjectIndex === 0) {
      $scope.project.prev = projects[projects.length - 1].slug;
    } else {
      $scope.project.prev = projects[currentProjectIndex - 1].slug;
    }
    if (currentProjectIndex === (projects.length - 1)) {
      $scope.project.next = projects[0].slug;
    } else {
      $scope.project.next = projects[currentProjectIndex + 1].slug;
    }
    // scrollto('#portfolio');

    $scope.animate = function (animation) {
      $scope.animation = animation + '-animation';
      Animation.setAnimation($scope.animation);
    };

  });
