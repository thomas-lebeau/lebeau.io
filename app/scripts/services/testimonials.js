'use strict';

angular.module('portfolioApp')
  .service('Testimonials', function Testimonials() {
  var testimonials = [
      {
        name: 'Sevim Tokmak',
        company: 'Aleni Reklam',
        companyLink: 'http://alenireklam.com',
        textTR: 'İhtiyaçlarımız konusunda,  bize olan desteğinden dolayı teşekkür ediyoruz. Kalite, uyum, birlikte çalışabilme konularında ki özen ve başarısı ile iyi bir çözüm ortağı.',
        text: 'We thank Thomas for his support in our job. His quality work and professionalism makes him a good business partner'
      }
    ];

  this.getTestimonials = function () {
    return testimonials;
  };

});
