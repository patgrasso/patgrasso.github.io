/*global jQuery, $*/
'use strict';

var bg = jQuery('header');

function resizeBackground() {
  bg.height(jQuery(window).height());
}

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

  if (screen.width <= 420) {
    jQuery(window).resize('resizeBackground');
    resizeBackground();
  }

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