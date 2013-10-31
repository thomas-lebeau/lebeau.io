/* global jQuery */
/* Author:
     Thomas Lebeau
*/
'use strict';

// var navScrollSpeed = 800;
// var scrollto = function (target) {
//   // scroll to #target
//   (jQuery)('html,body').stop().animate({scrollTop: (jQuery)(target).offset().top}, navScrollSpeed);
// };

(function ($) {

  // Some init things
  // $('#back-to-top a').css({'bottom': '-46px'});

  // event monitor
  // $('a').click(function (event) {
  //   if (this.hash) {
  //     event.preventDefault();
  //     var target = this.hash;

  //     if (target === '#top') {
  //       target = $('body');
  //     }
  //     scrollto(target);
  //   }
  // });

  // fade in-out header on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() >= ($('.tagline').position().top + 180)) {
      $('#top').addClass('read');
    } else {
      $('#top').removeClass('read');
    }
  });

  // add target="_blank" to external links
  $('a[href^=\'http://\']').attr('target', '_blank');

})(jQuery);

