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

  var SCROLL_TOP_LIMIT = 25;
  var navMain = document.getElementsByClassName('nav-main')[0];

  var scrollHandler = debounce(function() {
    if (window.scrollY > SCROLL_TOP_LIMIT) {
      navMain.classList.add('nav-small');
    } else {
      navMain.classList.remove('nav-small');
    }
  }, 250);

  window.addEventListener('scroll', scrollHandler);
})();
