'use strict';

angular.module('portfolioApp', ['ngRoute', 'ngAnimate', 'ngResource', 'angulartics', 'angulartics.google.analytics', 'angulartics.scroll'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/portfolio-list.html',
        controller: 'PortfolioListCtrl'
      })
      .when('/portfolio/:project', {
        templateUrl: 'views/portfolio-detail.html',
        controller: 'PortfolioDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('!');
  });

// Disable autoscroll hack
angular.module('portfolioApp').value('$anchorScroll', angular.noop);
