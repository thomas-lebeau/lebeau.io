/* global jQuery */
'use strict';

angular.module('portfolioApp')
  .controller('ContactCtrl', function ($scope, $http, $sce) {

    $scope.email = {};
    $scope.validation = {};
    $scope.sendButton = {
      status: 'enabled',
      text: $sce.trustAsHtml('<i class="fa fa-envelope-o"></i> Send')
    };

    var url = 'scripts/php/mail.php';

    $scope.sendEmail = function () {

      $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Sending');
      console.log($scope.contactForm);
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
          } else {
            $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');
          }
        }).error( function () {
          $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');
        });
      }else {
        $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');

      }
    };

  });
