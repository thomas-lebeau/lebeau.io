/* global jQuery */
'use strict';

angular.module('portfolioApp')
  .controller('ContactCtrl', function ($scope, $http, $sce, $analytics) {

    $scope.email = {};
    $scope.validation = {};
    $scope.sendButton = {
      status: 'enabled',
      text: $sce.trustAsHtml('<i class="fa fa-envelope-o"></i> Send')
    };

    var url = 'scripts/php/mail.php';

    $scope.sendEmail = function () {

      $analytics.eventTrack('SendTotal', {category: 'contactForm'});
      $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Sending');
      if ($scope.contactForm.$valid && $scope.contactForm.$dirty) {
        $http({
          method: 'POST',
          url: url,
          data: jQuery.param($scope.email),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
          if (data.status === 'ok') {
            $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-check success"></i> thank you!');
            $scope.sendButton.status = 'disabled';
            $scope.email = {};
            $analytics.eventTrack('SendSuccess', {category: 'contactForm'});
          } else {
            $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');
            $analytics.eventTrack('SendErrorDataEmpty', {category: 'contactForm'});
          }
        }).error( function () {
          $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');
          $analytics.eventTrack('SendErrorXHR', {category: 'contactForm'});
        });
      }else {
        $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');
        $analytics.eventTrack('SendErrorFormInvalid', {category: 'contactForm'});
      }
    };

  });
