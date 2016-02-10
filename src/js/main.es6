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
    if (typeof viewportHeight === 'undefined') {
      return updateViewportHeight();
    } else {
      return viewportHeight;
    }
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

  $(window).on('resize', updateViewportHeight);
  $(window).on('scroll', _.throttle(scrollSpy, 250));

});
