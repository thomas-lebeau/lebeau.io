/* global jQuery */
/* Author:
     Thomas Lebeau
*/
'use strict';

var navScrollSpeed = 800;
var scrollto = function (target) {
  // scroll to #target
  (jQuery)('html,body').stop().animate({scrollTop: (jQuery)(target).offset().top}, navScrollSpeed);
};

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

  // fade in-out #back-to-top and header
  $(window).scroll(function () {
    if ($(this).scrollTop() >= ($('.tagline').position().top + 180)) {
      $('#back-to-top a').css({'bottom': '0'});
      $('#top').addClass('read');
    } else {
      $('#back-to-top a').css({'bottom': '-46px'});
      $('#top').removeClass('read');
    }
  });

  // add target="_blank" to external links
  $('a[href^=\'http://\']').attr('target', '_blank');


  // contact form
  $('.contact form').submit(function (e) {
    e.preventDefault();
    var btnSendHtml = $('button[type=\'submit\']').html();
    var btnloadingHTML = $('button[type=\'submit\']').attr('data-loading-text');
    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function () {
        $('button[type=\'submit\']').attr('disabled', 'true')
        .html(btnloadingHTML)
        .removeClass('btn-success')
        .addClass('btn-warning');
      },
      success: function (data) {
              // messages
              // var okMsg = 'Your message was sent!';
              // var validationMsg = 'Fill this field correctly';
              var failMsg = 'Sorry, we couldn\'t send your message. Please, try once again.';

              // returned data
              if (data.status === 'ok') {
                $('button[type=\'submit\']').html('Thank you !')
                .removeClass('btn-warning')
                .addClass('btn-success');
                  //$('.contact form').reset();
              }
              else if (data.status === 'error_validation') {
                $.each(data.errors, function (field, msg) {
                  $("[name='" + field + "']").parents('.control-group').addClass('error').end().attr('title', msg).tooltip({
                    trigger: focus
                  }).keypress(function () {
                    $(this).parents('.control-group').removeClass('error').end().tooltip('hide').off().removeData('tooltip').attr('title', ' ');
                  }).change(function () {
                    $(this).parents('.control-group').removeClass('error').end().tooltip('hide').off().removeData('tooltip').attr('title', ' ');
                  });
                });
                $('.control-group.error').first().find('input, textarea').focus();
                $('button[type=\'submit\']').removeAttr('disabled');
                $('button[type=\'submit\']').html(btnSendHtml)
                .removeClass('btn-warning')
                .addClass('btn-success');
              }
              else if (data.status === 'error_critical') {
                $('.contact form .validation-msg').html('<span class="alert alert-error">' + failMsg + '</span>');
              }

            },
      complete: function () {}
    });
  });

  // pollyfill background-size: cover for ie lt 9
  // if (!Modernizr.backgroundsize) {
  //   $('body > header').css('background-size', 'cover');
  // }

})(jQuery);

