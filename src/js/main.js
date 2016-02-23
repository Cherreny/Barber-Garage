import $ from 'jquery';
import throttle from 'lodash.throttle';

import customSmoothScroll from './custom-smooth-scroll';

$().ready(() => {
  customSmoothScroll();

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

  $(window).on('resize', updateViewportHeight);
  $(window).on('scroll', throttle(scrollSpy, 250));

  $(window).on('resize', () => updateViewportHeight);

});
