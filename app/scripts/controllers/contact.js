/* global jQuery */
'use strict';

angular.module('portfolioApp')
  .controller('ContactCtrl', function ($scope, $http, $sce, $analytics) {

    $scope.email = {
      _subject: '[lebeau.io] new message'
    };
    $scope.validation = {};
    $scope.sendButton = {
      status: '',
      text: ''
    };

    var url = '//forms.brace.io/lebeau.thomas@gmail.com';

    function setStatus(status){
      switch(status) {
        case 'sending':
          $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Sending');
          $scope.sendButton.status = 'disabled';
        case 'success':
          $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-check success"></i> thank you!');
          $scope.sendButton.status = 'disabled';
          break;
        case 'error':
          $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-times error"></i> Oops, something\'s wrong!');
          $scope.sendButton.status = 'enabled';
          break;
        default:
          $scope.sendButton.text = $sce.trustAsHtml('<i class="fa fa-envelope-o"></i> Send');
          $scope.sendButton.status = 'enabled';
      }
    }

    // initialise the sendButton
    setStatus();

    $scope.sendEmail = function () {

      $analytics.eventTrack('SendTotal', {category: 'contactForm'});
      setStatus('sending');
      if ($scope.contactForm.$valid && $scope.contactForm.$dirty) {
        jQuery.ajax({
          url: url,
          method: 'POST',
          data: $scope.email,
          dataType: 'json'
        }).success(function (data) {
          if (data.success === 'Email sent') {
            setStatus('success');
            $scope.email = {};
            $analytics.eventTrack('SendSuccess', {category: 'contactForm'});
          } else {
            setStatus('error');
            $analytics.eventTrack('SendErrorDataEmpty', {category: 'contactForm'});
          }
        }).error( function () {
          setStatus('error');
          $analytics.eventTrack('SendErrorXHR', {category: 'contactForm'});
        });
      }else {
        setStatus('error');
        $analytics.eventTrack('SendErrorFormInvalid', {category: 'contactForm'});
      }
    };

  });
