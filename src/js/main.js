import $ from "jquery";
import throttle from "lodash.throttle";

$().ready(() => {
  const SCROLL_TOP_LIMIT = 25;
  let $navMain = $('.nav-main');
  let $mobileNavToggleButton = $('.nav-toggle');

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
    $(window).on('scroll', throttle(scrollHandler, 250));
  }

  smoothScroll.init({
    selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutQuad', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: 0 // Integer. How far to offset the scrolling anchor location in pixels
  });

  $mobileNavToggleButton.on('click', () => {
    $mobileNavToggleButton.toggleClass('open');
  });

  let $navLinks = $('.nav-home__link');

  $navLinks.on('click', (event) => {
    setActive($navLinks, event.currentTarget);
  });

  function setActive(links, currentElem) {
    clearActive(links);
    $(currentElem).addClass('active');
  }

  function clearActive(links) {
    links.each((idx, elem) => {
      $(elem).removeClass('active');
    });
  }

  let sectionsList = ['home', 'barber', 'garage', 'contact'];
  let viewportHeight = getViewportHeight();

  let $sectionsObject = sectionsList.map((section) => {
    let id = `#${section}`;
    let $jqueryObj = $(id)[0];

    return {
      name: section,
      $jqueryObj
    };
  });

  function getViewportHeight() {
    return typeof viewportHeight === 'undefined' ? updateViewportHeight() : viewportHeight;
  }

  function updateViewportHeight() {
    return document.documentElement.clientHeight;
  }

  function getDistance($section, currentSpecificGravity) {
    let sectionSpecificGravity = $section.offsetTop + ($section.clientHeight / 2);
    return Math.abs(currentSpecificGravity - sectionSpecificGravity);
  }

  function scrollSpy() {
    let viewportHeight = getViewportHeight();
    let currentOffsetTop = window.scrollY;
    let currentSpecificGravity = currentOffsetTop + (viewportHeight / 2);

    let closestSection = $sectionsObject.reduce((prev, curr) => {
      return getDistance(prev.$jqueryObj, currentSpecificGravity) <
             getDistance(curr.$jqueryObj, currentSpecificGravity) ? prev : curr;
    });

    setActive($navLinks, $navLinks[$sectionsObject.indexOf(closestSection)]);
  }

  scrollSpy();

  let container = $('#embed_container');
  let video = $('#video');

  function resizeVideo() {
    // this is taken form WP Alice theme
    let o = {};
    o.width = container.outerWidth(),
    o.height = container.outerHeight();
    let a = 24
      , n = 100
      , s = {}
      , l = container.closest(".video-section-container").outerWidth()
      , r = container.closest(".video-section-container").outerHeight();
    container.width(l),
    container.height(r),
    s.width = o.width + o.width * a / 100,
    s.height = Math.ceil(9 * o.width / 16),
    s.marginTop = -((s.height - o.height) / 2),
    s.marginLeft = -(o.width * (a / 2) / 100),
    s.height < o.height && (s.height = o.height + o.height * a / 100,
    s.width = Math.floor(16 * o.height / 9),
    s.marginTop = -(o.height * (a / 2) / 100),
    s.marginLeft = -((s.width - o.width) / 2)),
    s.width += n,
    s.height += n,
    s.marginTop -= n / 2,
    s.marginLeft -= n / 2,
    video.css({
        width: s.width,
        height: s.height,
        marginTop: s.marginTop,
        marginLeft: s.marginLeft
    })
  }

  resizeVideo();

  $(window).on('resize', () => {
    updateViewportHeight();
    resizeVideo();
  });
  $(window).on('scroll', throttle(scrollSpy, 250));

});
