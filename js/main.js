/**
 *  Name: main.js
 *  Author: Patrick Grasso
 *  Dependencies: None
 *  Description:
 *      Contains methods for operating on the UI
 */

/*global window, location, $*/

require([], function () {
    'use strict';
    var topArrowOffset = 250,
        topArrowDuration = 300;

    function setLocationHash(elem) {
        var hash = elem.id,
            tempAnchor = $('<a>').attr('id', hash).css({
                position: 'absolute',
                top: $(window).scrollTop(),
                left: $(window).scrollLeft()
            });

        elem.id = '';
        $('body').prepend(tempAnchor);
        location.hash = hash;
        tempAnchor.remove();
        elem.id = hash;
    }

    /* Code taken from css-tricks.com/snippets/jquery/smooth-scrolling/ */
    $(function () {
        $('a[href*=#]').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var hash = this.hash,
                    target = $(hash || 'body');
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    setLocationHash(target[0]);
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > topArrowOffset) {
            $('#top-arrow').fadeIn(topArrowDuration);
        } else {
            $('#top-arrow').fadeOut(topArrowDuration);
        }
    });

    $('html,body').on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
        $(this).stop();
    });

    $('.btn-menu, .overlay').on('click tap', function () {
      if ($('.name-tag, nav ul').hasClass('show')) {
        $('.name-tag, nav ul, .overlay').removeClass('show');
      } else {
        $('.name-tag, nav ul, .overlay').addClass('show');
      }
    });
});
