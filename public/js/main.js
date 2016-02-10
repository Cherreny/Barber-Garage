'use strict';

$().ready(function () {
  var SCROLL_TOP_LIMIT = 25;
  var $navMain = $('.nav-main');
  var $mobileNavToggleButton = $('.nav-toggle');

  function scrollHandler() {
    if (window.scrollY > SCROLL_TOP_LIMIT) {
      $navMain.addClass('nav-small');
    } else {
      $navMain.removeClass('nav-small');
    }
  }

  if ($navMain.data('nav-small')) {
    $navMain.addClass('nav-small');
  } else {
    $(window).on('scroll', _.throttle(scrollHandler, 250));
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

  var $navLinks = $('.nav-home__link');

  $navLinks.on('click', function (event) {
    setActive($navLinks, event.currentTarget);
  });

  function setActive(links, currentElem) {
    clearActive(links);
    $(currentElem).addClass('active');
  }

  function clearActive(links) {
    links.each(function (idx, elem) {
      $(elem).removeClass('active');
    });
  }

  var sectionsList = ['home', 'barber', 'garage', 'contact'];
  var viewportHeight = getViewportHeight();

  var $sectionsObject = sectionsList.map(function (section) {
    var id = '#' + section;
    var $jqueryObj = $(id)[0];

    return {
      name: section,
      $jqueryObj: $jqueryObj
    };
  });

  function getViewportHeight() {
    return typeof viewportHeight === 'undefined' ? updateViewportHeight() : viewportHeight;
  }

  function updateViewportHeight() {
    return document.documentElement.clientHeight;
  }

  function getDistance($section, currentSpecificGravity) {
    var sectionSpecificGravity = $section.offsetTop + $section.clientHeight / 2;
    return Math.abs(currentSpecificGravity - sectionSpecificGravity);
  }

  function scrollSpy() {
    var viewportHeight = getViewportHeight();
    var currentOffsetTop = window.scrollY;
    var currentSpecificGravity = currentOffsetTop + viewportHeight / 2;

    var closestSection = $sectionsObject.reduce(function (prev, curr) {
      return getDistance(prev.$jqueryObj, currentSpecificGravity) < getDistance(curr.$jqueryObj, currentSpecificGravity) ? prev : curr;
    });

    setActive($navLinks, $navLinks[$sectionsObject.indexOf(closestSection)]);
  }

  scrollSpy();

  $(window).on('resize', updateViewportHeight);
  $(window).on('scroll', _.throttle(scrollSpy, 250));
});