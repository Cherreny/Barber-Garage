'use strict';

$().ready(function () {
  function debounce(func, wait, immediate) {
    var timeout = null;
    return function debounceInner() {
      var context = this,
          args = Array.prototype.slice.call(arguments);
      function laterFn() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(laterFn, wait);
      if (callNow) func.apply(context, args);
    };
  }

  var SCROLL_TOP_LIMIT = 25;
  var $navMain = $('.nav-main');
  var $mobileNavToggleButton = $('.nav-toggle');

  if ($navMain.data('nav-small')) {
    $navMain.addClass('nav-small');
  } else {
    addScrollHandler();
  }

  function addScrollHandler() {
    var scrollHandler = debounce(function () {
      if (window.scrollY > SCROLL_TOP_LIMIT) {
        $navMain.addClass('nav-small');
      } else {
        $navMain.removeClass('nav-small');
      }
    }, 250);

    $(window).on('scroll', scrollHandler);
  }

  smoothScroll.init({
    selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutQuad', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: 0 // Integer. How far to offset the scrolling anchor location in pixels
  });

  $mobileNavToggleButton.on('click', function () {
    $mobileNavToggleButton.toggleClass('open');
  });

  $('.nav-home__link').each(function (idx, elem) {
    $(elem).on('click', setActive);
  });

  function setActive(currentElem) {
    $('.nav-home__link').each(function (idx, elem) {
      $(elem).removeClass('active');
    });
    $(currentElem).addClass('active');
  }
});