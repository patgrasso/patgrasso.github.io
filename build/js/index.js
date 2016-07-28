/*eslint no-console:0*/
/*global $, mobilecheck*/
'use strict';

// mobile resizing

(function () {
  var bg = $('header');
  var ogHeight = bg.height();
  var ogWidth = bg.width();

  function resizeBackground() {
    if (bg.width() !== ogWidth) {
      ogWidth = bg.width();
      ogHeight = $(window).height();
    }
    return bg.height(ogHeight);
  }

  $(document).ready(function () {
    if (mobilecheck()) {
      $(window).resize(resizeBackground);
      resizeBackground();
    }
  });
})();

// video handling
(function () {
  var LS_PLAY_PREF = 'videoPlayPreference';

  var stopVideo = function stopVideo() {
    $('#bg-vid video')[0].pause();
    $('#bg-vid video').hide();
    $('#bg-vid .video-controls .stop').attr('hidden', 'hidden');
    $('#bg-vid .video-controls .pause').attr('hidden', '');
    $('#bg-vid .video-controls .play').removeAttr('hidden');
    $('body').addClass('hide-video');
    localStorage.setItem(LS_PLAY_PREF, 'off');
  },
      playVideo = function playVideo() {
    $('#bg-vid video').show();
    $('body').removeClass('hide-video');
    $('#bg-vid video')[0].play();
    $('#bg-vid .video-controls .play').attr('hidden', '');
    $('#bg-vid .video-controls .pause').removeAttr('hidden');
    $('#bg-vid .video-controls .stop').removeAttr('hidden');
    localStorage.setItem(LS_PLAY_PREF, 'on');
  },
      pauseVideo = function pauseVideo() {
    $('#bg-vid video')[0].pause();
    $('#bg-vid .video-controls .pause').attr('hidden', '');
    $('#bg-vid .video-controls .play').removeAttr('hidden');
  };

  if (screen.width >= 800) {
    var preference = localStorage.getItem(LS_PLAY_PREF);

    if (preference == null) {
      localStorage.setItem(LS_PLAY_PREF, 'on');
      preference = 'on';
    }

    if (preference === 'on') {
      playVideo();
    } else {
      stopVideo();
    }

    // video control handlers
    $('#bg-vid .pause').click(pauseVideo);
    $('#bg-vid .play').click(playVideo);
    $('#bg-vid .stop').click(stopVideo);
  }
})();

// setup on-scroll opacity change to the down arrows at the bottom of the header
(function () {
  var FADE_LENGTH = 300;
  var TRANSLATE_FACTOR = 3;
  var arrows;
  var bottom;
  var body;

  $(document).ready(function () {
    bottom = $('header .bottom');
    arrows = $('header .bottom img');
    body = document.body;
  });

  $(document).on('scroll touchmove', function () {
    arrows && arrows.css({
      opacity: 1 - body.scrollTop / FADE_LENGTH
    });
    bottom && bottom.css({
      bottom: -(body.scrollTop / TRANSLATE_FACTOR)
    });
  });
})();

// handle contact form submission
(function () {
  $('#contact-form').submit(function (event) {
    var form = {};

    event.preventDefault();

    $(event.target).find('.form-control').each(function (i, input) {
      form[input.name] = input.value;
    });

    $('#contact-form .status').attr('hidden', '');

    $.ajax({
      url: event.target.action,
      method: event.target.method,
      data: form,
      dataType: 'json',
      success: function success(data) {
        $('#contact-form .status.success').removeAttr('hidden');
        $('#contact-form button.submit').attr('disabled', '');
        console.log(data);
      },
      error: function error(data) {
        $('#contact-form .status.failure').removeAttr('hidden');
        console.log(data);
      }
    });
  });
})();