import $ from 'jquery';
import throttle from 'lodash.throttle';
import MobileDetect from 'mobile-detect';

$().ready(() => {
  const SCROLL_TOP_LIMIT = 25;
  const IS_HOMEPAGE = $('html').hasClass('homepage');

  let $window = $(window);
  let $navMain = $('.nav-main');
  let $mobileNavToggleButton = $('.nav-toggle');

  function scrollHandler() {
    if (window.scrollY > SCROLL_TOP_LIMIT) {
      $navMain.addClass('nav-small');
    } else {
      $navMain.removeClass('nav-small');
    }
  }

  let md = new MobileDetect(window.navigator.userAgent);
  let isMobile = !!md.mobile();

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

    if ($sectionsObject.indexOf(closestSection) > 0) {
      vimeo().mute();
    }

    setActive($navLinks, $navLinks[$sectionsObject.indexOf(closestSection)]);
  }

  let videoContainer = $('#embed_container');
  let video = null;

  function resizeVideo() {
    // this is taken form WP Alice theme
    let o = {
      width: videoContainer.outerWidth(),
      height: videoContainer.outerHeight()
    };
    let a = 24;
    let n = 100;
    let s = {};
    let l = videoContainer.closest(".video-section-container").outerWidth();
    let r = videoContainer.closest(".video-section-container").outerHeight();
    videoContainer.width(l),
    videoContainer.height(r),
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

  function updateSubpageHeight() {
    let $subpageContentHeight = $('.subpage').children().outerHeight();
    let $html = $('html');
    let windowInnerHeight = window.innerHeight;

    if ($html.height() < windowInnerHeight) {
      $html.height(windowInnerHeight);
    } else if (windowInnerHeight < $subpageContentHeight) {
      $html.height($subpageContentHeight);
    } else if (windowInnerHeight < $html.height()) {
      $html.height(windowInnerHeight);
    }
  }

  let vimeo = function() {
    let player = $f($('#video')[0]);
    let $btnPlay = $('.intro-btn-play');
    let $btnVolume = $('.intro-btn-volume');
    let playing = true;
    let volume = 0;

    function init() {
      player.addEvent('ready', () => {
        if (isMobile === false) {
          $btnPlay.show(500);
          $btnVolume.show(500);
          player.api('setVolume', volume);
        }
      });

      $btnPlay.on('click', () => {
        $btnPlay[playing ? 'removeClass' : 'addClass']('intro-btn-play--playing');
        if (playing) {
          player.api('pause');
        } else {
          player.api('play');
        }
        playing = !playing;
      });

      $btnVolume.on('click', () => {
        $btnVolume[volume ? 'addClass' : 'removeClass']('intro-btn-volume--muted');
        volume = volume ? 0 : 1;
        player.api('setVolume', volume);
      });
    }

    function getVolume() {
      return volume;
    }

    function mute() {
      $btnVolume.addClass('intro-btn-volume--muted');
      volume = 0;
      player.api('setVolume', volume);
    }

    return {
      init: init,
      getVolume: getVolume,
      mute: mute
    };
  };

  function addIframe() {
    // vimeo player doesn't work on mobile with added `background` parameter
    // so we check if the client is mobile device and then serve vimeo player
    // without `background` parameter
    let params = isMobile ?
        '?api=1&autoplay=1&loop=1&player_id=video'
      : '?api=1&background=1&autoplay=1&loop=1&player_id=video'

    let iframe = $('<iframe />');
    iframe.attr({
      id: 'video',
      frameborder: 0,
      webkitAllowFullScreen: true,
      mozallowfullscreen: true,
      allowFullScreen: true,
      src: 'https://player.vimeo.com/video/155022290' + params
    });
    videoContainer.append(iframe);
    video = $('#video');
  }

  if (IS_HOMEPAGE) {
    addIframe();
    vimeo().init();
    scrollSpy();
    resizeVideo();
    scrollHandler();

    $window.on('resize', () => {
      updateViewportHeight();
      resizeVideo();
    });

    $window.on('scroll', () => {
      throttle(scrollHandler, 250)();
      throttle(scrollSpy, 250)();
    });
  } else {
    updateSubpageHeight();

    $window.on('resize', throttle(updateSubpageHeight, 200));
  }

});
