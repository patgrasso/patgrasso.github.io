/*global jQuery, $*/
'use strict';

let bg = jQuery('header');

function resizeBackground() {
  bg.height(jQuery(window).height());
}


// video handling
(function () {
  const LS_PLAY_PREF = 'videoPlayPreference';

  let stopVideo = () => {
      $('#bg-vid video')[0].pause();
      $('#bg-vid video').hide();
      $('#bg-vid .video-controls .stop').attr('hidden', 'hidden');
      $('#bg-vid .video-controls .pause').attr('hidden', '');
      $('#bg-vid .video-controls .play').removeAttr('hidden');
      $('body').addClass('hide-video');
      localStorage.setItem(LS_PLAY_PREF, 'off');
    }
    , playVideo = () => {
      $('#bg-vid video').show();
      $('body').removeClass('hide-video');
      $('#bg-vid video')[0].play();
      $('#bg-vid .video-controls .play').attr('hidden', '');
      $('#bg-vid .video-controls .pause').removeAttr('hidden');
      $('#bg-vid .video-controls .stop').removeAttr('hidden');
      localStorage.setItem(LS_PLAY_PREF, 'on');
    }
    , pauseVideo = () => {
      $('#bg-vid video')[0].pause();
      $('#bg-vid .video-controls .pause').attr('hidden', '');
      $('#bg-vid .video-controls .play').removeAttr('hidden');
    };

  if (screen.width <= 420) {
    jQuery(window).resize('resizeBackground');
    resizeBackground();
  }

  if (screen.width >= 800) {
    let preference = localStorage.getItem(LS_PLAY_PREF);

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
