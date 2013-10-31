/* jshint camelcase:false */
/* global jQuery */

'use strict';

angular.module('portfolioApp')
  .controller('TwitterCtrl', function ($scope, $http, $timeout, twitterUtilities) {

    $scope.tweets = [];
    $scope.loaded = false;
    var tweets = [];
    var proxyUrl = '/portfolio/twitter/';
    var params = {
      request: {
        host: 'api.twitter.com',
        url: '/1.1/statuses/user_timeline.json',
        parameters: {
          include_entities: 1,
          screen_name: ['tomalebeau'],
          page: 1,
          count: 5,
          include_rts: 1
        }
      }
    };

    $http({
      method: 'POST',
      url: proxyUrl,
      data: jQuery.param(params),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
      if (data.message !== '') {
        console.warn(data.message);
      }
      angular.forEach(data.response, function (tweet) {
        tweets.push(twitterUtilities.clean(tweet));
      });
      var timer;
      var swapTime = 12 * 1000;
      var index = 0;
      $scope.tweets.push(tweets[index]);
      $scope.loaded = true;

      if (tweets.length > 1) {
        $scope.swapTweet = function () {
          timer = $timeout(function () {
            if (index < tweets.length - 1) {
              index++;
            } else {
              index = 0;
            }
            $scope.tweets.shift();
            $scope.tweets.push(tweets[index]);
            $scope.swapTweet();
          }, swapTime);
        };
        $scope.swapTweet();
      }

    });

  });
