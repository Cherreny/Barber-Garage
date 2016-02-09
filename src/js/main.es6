$().ready(() => {
  function debounce(func, wait, immediate) {
    var timeout = null;
    return function debounceInner() {
      var context = this, args = Array.prototype.slice.call(arguments);
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

  const SCROLL_TOP_LIMIT = 25;
  let $navMain = $('.nav-main');
  let $mobileNavToggleButton = $('.nav-toggle');

  if ($navMain.data('nav-small')) {
    $navMain.addClass('nav-small');
  } else {
    addScrollHandler();
  }

  function addScrollHandler() {
    let scrollHandler = debounce(function() {
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

  $mobileNavToggleButton.on('click', () => {
    $mobileNavToggleButton.toggleClass('open');
  });

  let $navLinks = $('.nav-home__link');

  $navLinks.on('click', (event) => {
    setActive($navLinks, event.currentTarget);
  });

  function setActive(links, currentElem) {
    clearActive(links);
    console.log(currentElem);
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
    return document.documentElement.clientHeight;
  }

  function scrollSpy(viewportHeight) {
    let currentOffsetTop = window.scrollY;
    let currentSpecificGravity = currentOffsetTop + (viewportHeight / 2);

    $sectionsObject.forEach(section => {
      let sectionSpecificGravity = section.$jqueryObj.offsetTop + (section.$jqueryObj.clientHeight / 2);
      section.distance = Math.abs(currentSpecificGravity - sectionSpecificGravity);
    });
    let closestSection = $sectionsObject.reduce((prev, curr) => {
      return prev.distance < curr.distance ? prev : curr;
    });

    setActive($navLinks, $navLinks[$sectionsObject.indexOf(closestSection)]);
  }
  scrollSpy(viewportHeight);

  $(window).on('resize', getViewportHeight);
  $(window).on('scroll', () => {
    scrollSpy(viewportHeight);
  });

});
