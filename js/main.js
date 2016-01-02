(function () {
  function debounce(func, wait, immediate) {
  	var timeout = null;
  	return function debounceInner() {
  		var context = this, args = Array.prototype.slice.call(arguments);
  		function laterFn() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(laterFn, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  function getElementByClassName(className) {
    if (document.getElementsByClassName) {
      return document.getElementsByClassName(className)[0];
    }

    if (document.querySelectorAll) {
      return document.querySelectorAll((' ' + className).replace(/ +/g, '.'))[0];
    }
  };

  function addClass(elem, className) {
    var re = new RegExp(className + '$', 'g');
    var elemClassName = elem.className;

    if (re.test(elemClassName) === false) {
      elem.className = elemClassName + ' ' + className;
    }
  }

  function removeClass(elem, className) {
    var re = new RegExp(className + '$', 'g');
    var elemClassName = elem.className;

    if (re.test(elemClassName) === true) {
      elemClassName = elemClassName.replace(className, '');
      // remove not need one space left after replacing `className`
      elem.className = elemClassName.slice(0, elemClassName.length - 1);
    }
  }

  var SCROLL_TOP_LIMIT = 25;
  var navMain = getElementByClassName('nav-main');

  var scrollHandler = debounce(function() {
    if (window.scrollY > SCROLL_TOP_LIMIT) {
      addClass.call(this, navMain, 'nav-small')
    } else {
      removeClass.call(this, navMain, 'nav-small')
    }
  }, 250);

  window.addEventListener('scroll', scrollHandler);
})();
