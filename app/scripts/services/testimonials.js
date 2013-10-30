'use strict';

angular.module('portfolioApp')
  .service('Testimonials', function Testimonials() {
  var testimonials = [
      {
        name: 'John Doe',
        company: 'Company Name',
        companyLink: 'http://google.com',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, ipsa natus temporibus culpa provident mollitia assumenda possimus quidem cumque deserunt distinctio aspernatur impedit illum consectetur adipisci animi quisquam accusantium consequatur?'
      }, {
        name: 'Steve Jobs',
        company: 'Elmas Inc.',
        companyLink: 'http://google.com',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, ipsa natus temporibus culpa provident.'
      }
    ];

  this.getTestimonials = function () {
    return testimonials;
  };

});
