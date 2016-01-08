(function () {
  function addEvent(elem, method, callback) {
    if (elem.addEventListener) {
      elem.addEventListener(method, callback, false);
    } else {
      // IE8 polyfill
      elem.attachEvent(method, callback);
    }
  }

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

  var SCROLL_TOP_LIMIT = 25;
  var navMain = document.getElementsByClassName('nav-main')[0];

  var scrollHandler = debounce(function() {
    if (window.scrollY > SCROLL_TOP_LIMIT) {
      navMain.classList.add('nav-small');
    } else {
      navMain.classList.remove('nav-small');
    }
  }, 250);

  addEvent(window, 'scroll', scrollHandler);

  smoothScroll.init({
    selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutQuad', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: 0 // Integer. How far to offset the scrolling anchor location in pixels
  });


  var homepageNavLinks = Array.prototype.slice.call(document.getElementsByClassName('nav-home__link'));
  homepageNavLinks.forEach(function (elem) {
    addEvent(elem, 'click', setActive);
  });

  function removeClass(className) {
    homepageNavLinks.forEach(function (elem) {
      elem.classList.remove(className);
    });
  }

  function addClass(event) {
    removeActiveClass('active');
    event.target.classList.add('active');
  }
})();
