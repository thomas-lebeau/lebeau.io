'use strict';

angular.module('portfolioApp')
  .controller('TestimonialCtrl', function ($scope, $timeout, $http, Testimonials) {

    var timer;
    var swapTime = 12 * 1000;
    var index = 0;
    $scope.testimonials = [];
    var testimonials = Testimonials.getTestimonials();
    $scope.testimonials.push(testimonials[index]);

    if (testimonials.length > 1){
      $scope.swapTestimonial = function () {
        timer = $timeout(function () {
            if (index < testimonials.length - 1) {
              index++;
            } else {
              index = 0;
            }
            $scope.testimonials.shift();
            $scope.testimonials.push(testimonials[index]);
            $scope.swapTestimonial();
          }, swapTime);
      };
      $scope.swapTestimonial();
    }

  });
