'use strict';

angular.module('portfolioApp')
  .service('Animation', function Animation() {
    var animation = '';

    this.getAnimation = function () {
      return animation;
    };

    this.setAnimation = function (value) {
      animation = value;
    };

  });
