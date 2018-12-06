var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/kenzo/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Helpers = __webpack_require__(2);
	var Animation = __webpack_require__(3);
	var Carousel = __webpack_require__(4);
	var Share = __webpack_require__(5);
	var Youtube = __webpack_require__(6);
	var Statistic = __webpack_require__(7);
	var Forms = __webpack_require__(8);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  Share.init();
	  Carousel.init();

	  $.afterlag(function () {
	    $('html').addClass('is-loaded');
	  });

	  Animation.init();
	  Forms.init();

	  /*
	  if ((window.innerWidth > document.body.clientWidth) || !$('html').hasClass('fp-enabled')) {
	    $('.layout, .header').css({'padding-right': Helpers.getNativeScrollbarWidth() + 'px'});
	  }
	  */

	  Youtube.init();
	  Statistic.init();
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Helpers: Helpers,
	  Carousel: Carousel,
	  Share: Share,
	  Animation: Animation,
	  Youtube: Youtube,
	  Statistic: Statistic,
	  Forms: Forms
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	  sm: 768,
	  md: 1024,
	  lg: 1280,
	  xl: 1600
	};

	function isPortrait() {
	  return $(window).width() < $(window).height();
	}
	function isLandscape() {
	  return $(window).width() > $(window).height();
	}
	function isMobile() {
	  return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	  return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isDesktopExt() {
	  return $(window).width() >= breakpoints.md;
	}
	function isDesktop() {
	  return $(window).width() > breakpoints.md;
	}
	function isTouch() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	  return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
	  if (isTouch()) {
	    $('html').removeClass('no-touch').addClass('touch');
	  } else {
	    $('html').removeClass('touch').addClass('no-touch');
	  }
	}

	module.exports = {
	  run: run,
	  isTouch: isTouch,
	  isMobile: isMobile,
	  isTablet: isTablet,
	  isDesktop: isDesktop,
	  isDesktopExt: isDesktopExt,
	  isMobileVersion: isMobileVersion,
	  isPortrait: isPortrait,
	  isLandscape: isLandscape
		};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Helpers
	 * @module Helpers
	 */

	// Add script asynh
	function addScript(url) {
	  var tag = document.createElement("script");
	  tag.src = url;
	  var firstScriptTag = document.getElementsByTagName("script")[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	/**
	 * Calculate scrollbar width in element
	 * - if the width is 0 it means the scrollbar is floated/overlayed
	 * - accepts "container" paremeter because ie & edge can have different
	 *   scrollbar behaviors for different elements using '-ms-overflow-style'
	 */
	function getNativeScrollbarWidth(container) {
	  container = container || document.body;

	  var fullWidth = 0;
	  var barWidth = 0;

	  var wrapper = document.createElement('div');
	  var child = document.createElement('div');

	  wrapper.style.position = 'absolute';
	  wrapper.style.pointerEvents = 'none';
	  wrapper.style.bottom = '0';
	  wrapper.style.right = '0';
	  wrapper.style.width = '100px';
	  wrapper.style.overflow = 'hidden';

	  wrapper.appendChild(child);
	  container.appendChild(wrapper);

	  fullWidth = child.offsetWidth;
	  wrapper.style.overflowY = 'scroll';
	  barWidth = fullWidth - child.offsetWidth;

	  container.removeChild(wrapper);

	  return barWidth;
	}

	/**
	 * Throttle Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last = void 0,
	      deferTimer = void 0;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	/** 
	 * Debounce Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this,
	        args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	};

	var timer = void 0;
	var timeout = false;
	var delta = 200;
	function resizeEnd() {
	  if (new Date() - timer < delta) {
	    setTimeout(resizeEnd, delta);
	  } else {
	    timeout = false;
	    $(window).trigger('resizeend');
	  }
	}

	function toggleClassIf(el, cond, toggledClass) {
	  if (cond) {
	    el.addClass(toggledClass);
	  } else {
	    el.removeClass(toggledClass);
	  }
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
	  var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

	  if (el.length == 0) {
	    //console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
	    return false;
	  }

	  if (scrollValue == 'this') {
	    scrollValue = el.offset().top - $(window).outerHeight() / 2;
	  }

	  $(window).on('scroll', function (e) {
	    if ($(window).scrollTop() > scrollValue) {
	      el.addClass(toggledClass);
	    } else {
	      el.removeClass(toggledClass);
	    }
	  });
	};

	/* Modals */
	function openModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    modal.fadeIn(500);
	    $('html, body').css('overflow-y', 'hidden');
	    win.fadeIn(500);
	    modal.trigger('modalopened');
	  } else {
	    console.error('Which modal?');
	  }
	}

	function closeModal(modal) {
	  if (modal) {
	    var win = modal.find('.modal__window');
	    win.fadeOut(500);
	    modal.fadeOut(500);
	    $('html, body').css('overflow-y', '');
	    modal.trigger('modalclosed');
	  } else {
	    console.error('Which modal?');
	  }
	}

	function setScrollpad(els) {
	  if ($('.layout').outerHeight() > window.outerHeight) {
	    els.css({ 'padding-right': getNativeScrollbarWidth() + 'px' });
	  } else {
	    els.css({ 'padding-right': '0px' });
	  }
	}

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Helpers.init();
	 */
	function init() {

	  toggleElementClassOnScroll($('.header'), 50);

	  $('.js-hide-block').on('click', function () {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    target.fadeOut(500);
	  });

	  $('.btn-close-modal').on('click', function () {
	    var target = !!$(this).data('target') ? $($(this).data('target')) : $(this).parent();
	    var modal = target.parent('.modal');
	    closeModal(modal);
	  });

	  $('.modal').on('click', function () {
	    closeModal($(this));
	  });

	  $('.btn-modal').on('click', function (e) {
	    var target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
	    e.preventDefault();
	    openModal(target);
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  if ($('.layout').hasClass('layout--home') && Main.DeviceDetection.isMobile()) {
	    if (Main.DeviceDetection.isLandscape()) {
	      $('html').addClass('rotate');
	      $('.page-rotate').fadeIn(500);
	    }

	    setScrollpad($('.layout, .page-animate'));

	    $(window).on('resizeend', function () {
	      setScrollpad($('.layout, .page-animate'));
	    });
	  }

	  $('.btn-open-aside').on('click', function (e) {
	    e.preventDefault();
	    $('.aside').addClass('is-open');
	    $('body').addClass('aside-is-open');
	    if ($('.layout').outerHeight() > window.outerHeight) {
	      $('.header, .sidebar').css({ 'right': getNativeScrollbarWidth() + 'px' });
	      $('html, body').css('overflow-y', 'hidden');
	    }
	  });
	  $('.btn-close-aside').on('click', function (e) {
	    e.preventDefault();
	    $('.aside').removeClass('is-open');
	    $('body').removeClass('aside-is-open');
	    if ($('.layout').outerHeight() > window.outerHeight) {
	      $('.header, .sidebar').css({ 'right': '0px' });
	      $('html, body').css('overflow-y', '');
	    }
	  });

	  $('.btn-accordion').on('click', function () {
	    var accordion = $($(this).data('target'));
	    $(this).toggleClass('is-open');
	    accordion.toggleClass('is-open').slideToggle(500);
	  });

	  $(window).scroll($.debounce(250, true, function () {
	    $('html').addClass('is-scrolling');
	  }));
	  $(window).scroll($.debounce(250, function () {
	    $('html').removeClass('is-scrolling');
	  }));
	}

	module.exports = {
	  init: init,
	  getNativeScrollbarWidth: getNativeScrollbarWidth,
	  toggleClassIf: toggleClassIf,
	  toggleElementClassOnScroll: toggleElementClassOnScroll,
	  addScript: addScript,
	  openModal: openModal,
	  closeModal: closeModal
		};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	var state = {
	  loaded: false,
	  anim: false
	};
	var debug = true;
	var delay = 1000;

	function setSize() {
	  $('.page-animate__item').each(function (index) {
	    $(this).css({ 'height': $('.project').eq(index).find('.project__img').outerHeight() });
	  });
	  if (Main.DeviceDetection.isMobile()) {
	    $('.page-animate__item').each(function (index) {
	      $(this).css({ 'margin-bottom': $('.project').eq(index).find('.project__info').outerHeight() });
	    });
	  }
	}

	function init() {

	  setSize();
	  $(window).on('resizeend', function () {
	    setSize();
	  });

	  $('.anim-link').on('click', function (e) {
	    e.preventDefault();
	    if (debug) {
	      $('html').trigger('animation-start');
	      setTimeout(function () {
	        $('html').trigger('content-loaded');
	      }, delay);
	    }
	  });

	  $('html').on('animation-start', function () {
	    $('html').addClass('is-animating animation-start');
	    setTimeout(function (state) {
	      state.anim = true;
	      $('html').trigger('page-ready');
	      if (state.loaded) {
	        $('html').addClass('content-loaded');
	      }
	    }, 2000, state);
	  });

	  $('html').on('content-loaded', function () {
	    setTimeout(function () {
	      state.loaded = true;
	      if (state.anim) {
	        $('html').addClass('content-loaded');
	      }
	      $('html').trigger('page-ready');
	    }, 500);
	  });

	  $('html').on('page-ready', function () {
	    if (state.anim && state.loaded) {
	      setTimeout(function () {
	        $('html').removeClass('content-loaded');
	      }, 500);
	      setTimeout(function () {
	        $('html').addClass('animation-end');
	      }, 1000);
	      setTimeout(function () {
	        $('html').removeClass('is-animating animation-start animation-end');
	      }, 2500);
	    }
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Карусель
	 * @module Carousel
	 */

	var carouselDef = void 0;

	/**
	 * Инициализация карусели
	 */
	function init() {
	  carouselDef = $(".owl-carousel.carousel--default");

	  carouselDef.owlCarousel({
	    items: 1,
	    margin: 0,
	    nav: false,
	    navText: ['', ''],
	    dots: true,
	    loop: true,
	    autoplay: true,
	    lazyLoad: true,
	    lazyLoadEager: 1,
	    mouseDrag: false,
	    animateOut: 'fadeOut'
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	function getIcon(el) {
	  var icon = '';
	  if (el.hasClass('ya-share2__item_service_vkontakte')) {
	    icon = 'vk';
	  }
	  if (el.hasClass('ya-share2__item_service_facebook')) {
	    icon = 'fb';
	  }
	  if (el.hasClass('ya-share2__item_service_twitter')) {
	    icon = 'tw';
	  }
	  if (el.hasClass('ya-share2__item_service_telegram')) {
	    icon = 'tg';
	  }
	  return '<svg class="icon social-icon"><use xlink:href="#' + icon + '"/></svg>';
	}
	function fillIcons() {
	  $('#share .ya-share2__item').each(function () {
	    $(this).find('.ya-share2__icon').html(getIcon($(this)));
	  });
	}
	function init() {
	  Ya.share2('share', {
	    content: {
	      url: window.location.href,
	      title: 'Круче их музыки только их история',
	      description: "В ожидании фильма «Богемская рапсодия» про Фредди Меркьюри и группы Queen «Лента.ру» рассказывает о самых интересных и неожиданных фактах из жизни великого музыканта",
	      image: 'http://bohemianrhapsody.lenta.ru/social.jpg'
	    },
	    theme: {
	      services: 'vkontakte,facebook,twitter,telegram',
	      bare: true,
	      lang: 'ru'
	    },
	    hooks: {
	      onready: function onready() {
	        fillIcons();
	      }
	    }
	  });
	}
	module.exports = { init: init };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Youtube
	 * @module Youtube
	 */

	// Init empty array of iframe IDs, one from each video
	var iframeIds = [];

	// Init empty array of iframe YT objects for use elsewhere
	// Here I only use this to iterate through and pause all videos when
	// another begins playing
	var iframeObjects = [];

	// Shared onReady event which adds events to each video's corresponding
	// play and stop buttons
	function onPlayerReady(event) {
	  var iframeObject = event.target;
	  var iframeElement = iframeObject.a;
	  var videoContainer = $(iframeElement).closest('.yt');
	  var modal = videoContainer.closest('.modal');
	  var play = videoContainer.find(".play");
	  var stop = videoContainer.find(".stop");

	  // Push current iframe object to array
	  iframeObjects.push(iframeObject);

	  play.on("click", function () {
	    // Pause all videos currently playing
	    iframeObjects.forEach(function (scopediframeObject) {
	      scopediframeObject.pauseVideo();
	      var scopediframeElement = scopediframeObject.a;
	      scopediframeElement.classList.remove('isPlaying');
	    });

	    // Play selected video
	    iframeObject.playVideo();
	    iframeElement.classList.add('isPlaying');
	  });

	  stop.on("click", function () {
	    iframeObject.pauseVideo();
	    iframeElement.classList.remove('isPlaying');
	  });

	  modal.on('modalclosed', function () {
	    iframeObject.pauseVideo();
	    iframeElement.classList.remove('isPlaying');
	  });
	}

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Youtube.init();
	 */

	function init() {

	  Main.Helpers.addScript("https://www.youtube.com/iframe_api");

	  // For each iframe you find, add its ID to the iframeIds array
	  var iframes = document.querySelectorAll(".yt iframe");
	  iframes.forEach(function (iframe) {
	    iframeIds.push(iframe.id);
	  });

	  // Once the YouTube API is ready, for each iframeId in your array, create
	  // a new YT player and give it the onReady event
	  window.onYouTubeIframeAPIReady = function () {
	    iframeIds.forEach(function (iframeId) {
	      var player = new YT.Player(iframeId, {
	        events: {
	          onReady: onPlayerReady
	        }
	      });
	    });
	  };
	}

	module.exports = { init: init };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Statistic
	 * @module Statistic
	 */

	function sendGa(category, action, label) {
	  ga('send', {
	    hitType: 'event',
	    eventCategory: category,
	    eventAction: action,
	    eventLabel: label
	  });
	};

	function init() {
	  $('.btn-ticket').on('click', function () {
	    sendGa('external', 'click', 'buy_ticket');
	  });
	  $('.link-lenta').on('click', function () {
	    sendGa('external', 'click', 'lenta_logo');
	  });

	  $('#trailer').on('modalopen', function () {
	    sendGa('internal', 'click', 'watch_trailer');
	  });
	  $('#trailer').on('modalclosed', function () {
	    sendGa('internal', 'click', 'close_trailer');
	  });
	  $('.btn-material').on('click', function () {
	    sendGa('internal', 'click', $(this).closest('.screen').data('material'));
	  });
	  $('.fp-section').on('sectionscrolled', function (e, label) {
	    sendGa('internal', 'scroll', label);
	  });

	  if ($('.layout').hasClass('layout--lenta')) {
	    jQuery.scrollDepth();
	  }
	}

	module.exports = { init: init, sendGa: sendGa };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Модуль для работы placeholder в элементах формы (.field)
	 * @module Input
	 */

	/**
	 * Установить фокус
	 * @private
	 * @param {object} input
	 */
	function focusLabel(input) {
	    input.closest('.field').addClass("has-focus");
	}

	/**
	 * Убрать фокус
	 * @private
	 * @param {object} input
	 */
	function blurLabel(input) {
	    var wrapper = input.closest('.field');
	    wrapper.removeClass("has-focus");
	}

	/**
	 * Проверить инпут на наличие value
	 * @private
	 * @param {object} input
	 */
	function checkInput(input) {
	    var wrapper = input.closest('.field');
	    if (input.val().length > 0) wrapper.addClass("has-value");else wrapper.removeClass("has-value");
	}

	/**
	 * инициализация событий для инпута
	 * @example
	 * Input.init();
	 */
	function init() {
	    var inputs = $('.field__input');
	    var placeholders = $('.field__placeholder');
	    var flow = $('.flow-textarea');

	    placeholders.click(function () {
	        $(this).closest('.field').find('.field__input').focus();
	    });

	    inputs.each(function (i, item) {
	        checkInput($(item));
	    });

	    inputs.focus(function () {
	        focusLabel($(this));
	    });

	    inputs.blur(function () {
	        blurLabel($(this));
	        checkInput($(this));
	    });

	    $('.btn-search').on('click', function (e) {
	        e.preventDefault();
	        $('#search').focus();
	    });

	    flow.on('keydown', function () {
	        $(this).change();
	    });

	    flow.on('change', function () {
	        setTimeout(function (self) {
	            var flowEx = $(self).siblings('.flow-textarea-example');
	            flowEx.html($(self).val().replace(/\r?\n/g, '<br/>'));
	            if (flow.outerHeight() !== flowEx.outerHeight()) {
	                flow.stop().animate({ 'height': flowEx.outerHeight() }, 300);
	            }
	        }, 10, this);
	    });
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZmI3ODhjMzA1MGI5NTY5ODE1NCIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zdGF0aXN0aWMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm1zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZmI3ODhjMzA1MGI5NTY5ODE1NCIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBTaGFyZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2hhcmVcIik7XHJcbmxldCBZb3V0dWJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy95b3V0dWJlXCIpO1xyXG5sZXQgU3RhdGlzdGljID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdGF0aXN0aWNcIik7XHJcbmxldCBGb3JtcyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybXNcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBTaGFyZS5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIFxyXG4gICQuYWZ0ZXJsYWcoZnVuY3Rpb24oKXtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgQW5pbWF0aW9uLmluaXQoKTtcclxuICBGb3Jtcy5pbml0KCk7XHJcblxyXG4gIC8qXHJcbiAgaWYgKCh3aW5kb3cuaW5uZXJXaWR0aCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHx8ICEkKCdodG1sJykuaGFzQ2xhc3MoJ2ZwLWVuYWJsZWQnKSkge1xyXG4gICAgJCgnLmxheW91dCwgLmhlYWRlcicpLmNzcyh7J3BhZGRpbmctcmlnaHQnOiBIZWxwZXJzLmdldE5hdGl2ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnfSk7XHJcbiAgfVxyXG4gICovXHJcblxyXG4gIFlvdXR1YmUuaW5pdCgpO1xyXG4gIFN0YXRpc3RpYy5pbml0KCk7XHJcbiAgXHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC/0LjRgdC+0Log0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC80YvRhSDQvNC+0LTRg9C70LXQuSwg0YfRgtC+0LHRiyDQuNC80LXRgtGMINC6INC90LjQvCDQtNC+0YHRgtGD0L8g0LjQt9Cy0L3QtVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluLkZvcm0uaXNGb3JtVmFsaWQoKTtcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIERldmljZURldGVjdGlvbixcclxuICBIZWxwZXJzLFxyXG5cdENhcm91c2VsLFxyXG4gIFNoYXJlLFxyXG4gIEFuaW1hdGlvbixcclxuICBZb3V0dWJlLFxyXG4gIFN0YXRpc3RpYyxcclxuICBGb3Jtc1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbWFpbi5qcyIsImxldCBicmVha3BvaW50cyA9IHtcclxuICBzbTogNzY4LFxyXG4gIG1kOiAxMDI0LFxyXG4gIGxnOiAxMjgwLFxyXG4gIHhsOiAxNjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc1BvcnRyYWl0KCkge1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPCAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wRXh0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3AoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHJ1bixcclxuICBpc1RvdWNoLFxyXG4gIGlzTW9iaWxlLFxyXG4gIGlzVGFibGV0LFxyXG4gIGlzRGVza3RvcCxcclxuICBpc0Rlc2t0b3BFeHQsXHJcbiAgaXNNb2JpbGVWZXJzaW9uLFxyXG4gIGlzUG9ydHJhaXQsXHJcbiAgaXNMYW5kc2NhcGVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqIEBtb2R1bGUgSGVscGVyc1xyXG4gKi9cclxuXHJcbi8vIEFkZCBzY3JpcHQgYXN5bmhcclxuZnVuY3Rpb24gYWRkU2NyaXB0ICh1cmwpIHtcclxuICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICB0YWcuc3JjID0gdXJsO1xyXG4gIHZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO1xyXG4gIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHNjcm9sbGJhciB3aWR0aCBpbiBlbGVtZW50XHJcbiAqIC0gaWYgdGhlIHdpZHRoIGlzIDAgaXQgbWVhbnMgdGhlIHNjcm9sbGJhciBpcyBmbG9hdGVkL292ZXJsYXllZFxyXG4gKiAtIGFjY2VwdHMgXCJjb250YWluZXJcIiBwYXJlbWV0ZXIgYmVjYXVzZSBpZSAmIGVkZ2UgY2FuIGhhdmUgZGlmZmVyZW50XHJcbiAqICAgc2Nyb2xsYmFyIGJlaGF2aW9ycyBmb3IgZGlmZmVyZW50IGVsZW1lbnRzIHVzaW5nICctbXMtb3ZlcmZsb3ctc3R5bGUnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCAoY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGxldCBmdWxsV2lkdGggPSAwO1xyXG4gIGxldCBiYXJXaWR0aCA9IDA7XHJcblxyXG4gIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbGV0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHdyYXBwZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICB3cmFwcGVyLnN0eWxlLmJvdHRvbSA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICBmdWxsV2lkdGggPSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gIGJhcldpZHRoID0gZnVsbFdpZHRoIC0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcblxyXG4gIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgcmV0dXJuIGJhcldpZHRoO1xyXG59XHJcblxyXG4vKipcclxuICogVGhyb3R0bGUgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcclxuICB0aHJlc2hob2xkIHx8ICh0aHJlc2hob2xkID0gMjUwKTtcclxuICBsZXQgbGFzdCxcclxuICAgIGRlZmVyVGltZXI7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gc2NvcGUgfHwgdGhpcztcclxuXHJcbiAgICBsZXQgbm93ID0gK25ldyBEYXRlKCksXHJcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xyXG4gICAgICAvLyBob2xkIG9uIHRvIGl0XHJcbiAgICAgIGNsZWFyVGltZW91dChkZWZlclRpbWVyKTtcclxuICAgICAgZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIH0sIHRocmVzaGhvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogXHJcbiAqIERlYm91bmNlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgbGV0IHRpbWVyID0gbnVsbDtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH07XHJcbn07XHJcblxyXG5sZXQgdGltZXI7XHJcbmxldCB0aW1lb3V0ID0gZmFsc2U7XHJcbmxldCBkZWx0YSA9IDIwMDtcclxuZnVuY3Rpb24gcmVzaXplRW5kKCkge1xyXG4gIGlmIChuZXcgRGF0ZSgpIC0gdGltZXIgPCBkZWx0YSkge1xyXG4gICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZW91dCA9IGZhbHNlO1xyXG4gICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZWVuZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiBNb2RhbHMgKi9cclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XHJcbiAgaWYgKG1vZGFsKSB7XHJcbiAgICBsZXQgd2luID0gbW9kYWwuZmluZCgnLm1vZGFsX193aW5kb3cnKTtcclxuICAgIG1vZGFsLmZhZGVJbig1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgIHdpbi5mYWRlSW4oNTAwKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsb3BlbmVkJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICB3aW4uZmFkZU91dCg1MDApO1xyXG4gICAgbW9kYWwuZmFkZU91dCg1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsY2xvc2VkJylcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcignV2hpY2ggbW9kYWw/Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTY3JvbGxwYWQoZWxzKSB7XHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICBlbHMuY3NzKHsncGFkZGluZy1yaWdodCc6IGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGVscy5jc3MoeydwYWRkaW5nLXJpZ2h0JzogJzBweCd9KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Lkg0LrQu9Cw0YHRgdC+0LJcclxuICogQGV4YW1wbGVcclxuICogSGVscGVycy5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgXHJcbiAgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoJCgnLmhlYWRlcicpLCA1MCk7XHJcbiAgXHJcbiAgJCgnLmpzLWhpZGUtYmxvY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgdGFyZ2V0LmZhZGVPdXQoNTAwKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmJ0bi1jbG9zZS1tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdGFyZ2V0ID0gISEkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID8gJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKSA6ICQodGhpcykucGFyZW50KCk7XHJcbiAgICBsZXQgbW9kYWwgPSB0YXJnZXQucGFyZW50KCcubW9kYWwnKTtcclxuICAgIGNsb3NlTW9kYWwobW9kYWwpXHJcbiAgfSk7XHJcblxyXG4gICQoJy5tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY2xvc2VNb2RhbCgkKHRoaXMpKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmJ0bi1tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGxldCB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID09PSAnc2VsZicgPyAkKHRoaXMpLnBhcmVudCgpIDogJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIG9wZW5Nb2RhbCh0YXJnZXQpO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGltZXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKHRpbWVvdXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5oYXNDbGFzcygnbGF5b3V0LS1ob21lJykgJiYgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSkge1xyXG4gICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdyb3RhdGUnKTtcclxuICAgICAgJCgnLnBhZ2Utcm90YXRlJykuZmFkZUluKDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2Nyb2xscGFkKCQoJy5sYXlvdXQsIC5wYWdlLWFuaW1hdGUnKSk7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemVlbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICBzZXRTY3JvbGxwYWQoJCgnLmxheW91dCwgLnBhZ2UtYW5pbWF0ZScpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICAkKCcuYnRuLW9wZW4tYXNpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJy5hc2lkZScpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2FzaWRlLWlzLW9wZW4nKTtcclxuICAgIGlmICgkKCcubGF5b3V0Jykub3V0ZXJIZWlnaHQoKSA+IHdpbmRvdy5vdXRlckhlaWdodCkge1xyXG4gICAgICAkKCcuaGVhZGVyLCAuc2lkZWJhcicpLmNzcyh7J3JpZ2h0JzogZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGgoKSArICdweCd9KTtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgIH1cclxuICB9KTtcclxuICAkKCcuYnRuLWNsb3NlLWFzaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCcuYXNpZGUnKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdhc2lkZS1pcy1vcGVuJyk7XHJcbiAgICBpZiAoJCgnLmxheW91dCcpLm91dGVySGVpZ2h0KCkgPiB3aW5kb3cub3V0ZXJIZWlnaHQpIHtcclxuICAgICAgJCgnLmhlYWRlciwgLnNpZGViYXInKS5jc3MoeydyaWdodCc6ICcwcHgnfSk7XHJcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tYWNjb3JkaW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgYWNjb3JkaW9uID0gJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKTtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgIGFjY29yZGlvbi50b2dnbGVDbGFzcygnaXMtb3BlbicpLnNsaWRlVG9nZ2xlKDUwMCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgdHJ1ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbml0LCBcclxuICBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCxcclxuICB0b2dnbGVDbGFzc0lmLCBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCwgXHJcbiAgYWRkU2NyaXB0LCBcclxuICBvcGVuTW9kYWwsIFxyXG4gIGNsb3NlTW9kYWxcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QviDRgNCw0LfQu9C40YfQvdGL0Lwg0YHQvtCx0YvRgtC40Y/QvFxyXG4gKiBAbW9kdWxlIEFuaW1hdGlvblxyXG4gKi9cclxuXHJcbmxldCBzdGF0ZSA9IHtcclxuICBsb2FkZWQ6IGZhbHNlLFxyXG4gIGFuaW06IGZhbHNlXHJcbn07XHJcbmxldCBkZWJ1ZyA9IHRydWU7XHJcbmxldCBkZWxheSA9IDEwMDA7XHJcblxyXG5mdW5jdGlvbiBzZXRTaXplKCkge1xyXG4gICQoJy5wYWdlLWFuaW1hdGVfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAkKHRoaXMpLmNzcyh7J2hlaWdodCc6ICQoJy5wcm9qZWN0JykuZXEoaW5kZXgpLmZpbmQoJy5wcm9qZWN0X19pbWcnKS5vdXRlckhlaWdodCgpfSk7XHJcbiAgfSk7XHJcbiAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkpIHtcclxuICAgICQoJy5wYWdlLWFuaW1hdGVfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICQodGhpcykuY3NzKHsnbWFyZ2luLWJvdHRvbSc6ICQoJy5wcm9qZWN0JykuZXEoaW5kZXgpLmZpbmQoJy5wcm9qZWN0X19pbmZvJykub3V0ZXJIZWlnaHQoKX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0ICgpIHtcclxuXHJcbiAgc2V0U2l6ZSgpO1xyXG4gICQod2luZG93KS5vbigncmVzaXplZW5kJywgZnVuY3Rpb24oKXtcclxuICAgIHNldFNpemUoKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmFuaW0tbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChkZWJ1Zykge1xyXG4gICAgICAkKCdodG1sJykudHJpZ2dlcignYW5pbWF0aW9uLXN0YXJ0Jyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdodG1sJykudHJpZ2dlcignY29udGVudC1sb2FkZWQnKTtcclxuICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKCdodG1sJykub24oJ2FuaW1hdGlvbi1zdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcgYW5pbWF0aW9uLXN0YXJ0Jyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKHN0YXRlKXtcclxuICAgICAgc3RhdGUuYW5pbSA9IHRydWU7XHJcbiAgICAgICQoJ2h0bWwnKS50cmlnZ2VyKCdwYWdlLXJlYWR5Jyk7XHJcbiAgICAgIGlmIChzdGF0ZS5sb2FkZWQpIHtcclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2NvbnRlbnQtbG9hZGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDIwMDAsIHN0YXRlKTtcclxuICB9KTtcclxuXHJcbiAgJCgnaHRtbCcpLm9uKCdjb250ZW50LWxvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBzdGF0ZS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICBpZiAoc3RhdGUuYW5pbSkge1xyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnY29udGVudC1sb2FkZWQnKTtcclxuICAgICAgfVxyXG4gICAgICAkKCdodG1sJykudHJpZ2dlcigncGFnZS1yZWFkeScpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9KTtcclxuXHJcbiAgJCgnaHRtbCcpLm9uKCdwYWdlLXJlYWR5JywgZnVuY3Rpb24oKXtcclxuICAgIGlmIChzdGF0ZS5hbmltICYmIHN0YXRlLmxvYWRlZCkge1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdjb250ZW50LWxvYWRlZCcpO1xyXG4gICAgICB9LCA1MDApO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdhbmltYXRpb24tZW5kJyk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0aW5nIGFuaW1hdGlvbi1zdGFydCBhbmltYXRpb24tZW5kJyk7XHJcbiAgICAgIH0sIDI1MDApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIi8qKlxyXG4gKiDQmtCw0YDRg9GB0LXQu9GMXHJcbiAqIEBtb2R1bGUgQ2Fyb3VzZWxcclxuICovXHJcblxyXG5sZXQgY2Fyb3VzZWxEZWY7XHJcblxyXG4vKipcclxuICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LrQsNGA0YPRgdC10LvQuFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIGNhcm91c2VsRGVmID0gJChcIi5vd2wtY2Fyb3VzZWwuY2Fyb3VzZWwtLWRlZmF1bHRcIik7XHJcblxyXG4gIGNhcm91c2VsRGVmLm93bENhcm91c2VsKHtcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgbWFyZ2luOiAwLFxyXG4gICAgbmF2OiBmYWxzZSxcclxuICAgIG5hdlRleHQ6IFsnJywgJyddLFxyXG4gICAgZG90czogdHJ1ZSxcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgIGxhenlMb2FkOiB0cnVlLFxyXG4gICAgbGF6eUxvYWRFYWdlcjogMSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICB9KTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9jYXJvdXNlbC5qcyIsImZ1bmN0aW9uIGdldEljb24oZWwpIHtcclxuICBsZXQgaWNvbiA9ICcnO1xyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdmtvbnRha3RlJykpIHtcclxuICAgIGljb24gPSAndmsnO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX2ZhY2Vib29rJykpIHtcclxuICAgIGljb24gPSAnZmInO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3R3aXR0ZXInKSkge1xyXG4gICAgaWNvbiA9ICd0dyc7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdGVsZWdyYW0nKSkge1xyXG4gICAgaWNvbiA9ICd0Zyc7XHJcbiAgfVxyXG4gIHJldHVybiAnPHN2ZyBjbGFzcz1cImljb24gc29jaWFsLWljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjJyArIGljb24gKyAnXCIvPjwvc3ZnPic7XHJcbn1cclxuZnVuY3Rpb24gZmlsbEljb25zKCkge1xyXG4gICQoJyNzaGFyZSAueWEtc2hhcmUyX19pdGVtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcueWEtc2hhcmUyX19pY29uJykuaHRtbChnZXRJY29uKCQodGhpcykpKTtcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIFlhLnNoYXJlMignc2hhcmUnLCB7XHJcbiAgICBjb250ZW50OiB7XHJcbiAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXHJcbiAgICAgIHRpdGxlOiAn0JrRgNGD0YfQtSDQuNGFINC80YPQt9GL0LrQuCDRgtC+0LvRjNC60L4g0LjRhSDQuNGB0YLQvtGA0LjRjycsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcItCSINC+0LbQuNC00LDQvdC40Lgg0YTQuNC70YzQvNCwIMKr0JHQvtCz0LXQvNGB0LrQsNGPINGA0LDQv9GB0L7QtNC40Y/CuyDQv9GA0L4g0KTRgNC10LTQtNC4INCc0LXRgNC60YzRjtGA0Lgg0Lgg0LPRgNGD0L/Qv9GLIFF1ZWVuIMKr0JvQtdC90YLQsC7RgNGDwrsg0YDQsNGB0YHQutCw0LfRi9Cy0LDQtdGCINC+INGB0LDQvNGL0YUg0LjQvdGC0LXRgNC10YHQvdGL0YUg0Lgg0L3QtdC+0LbQuNC00LDQvdC90YvRhSDRhNCw0LrRgtCw0YUg0LjQtyDQttC40LfQvdC4INCy0LXQu9C40LrQvtCz0L4g0LzRg9C30YvQutCw0L3RgtCwXCIsXHJcbiAgICAgIGltYWdlOiAnaHR0cDovL2JvaGVtaWFucmhhcHNvZHkubGVudGEucnUvc29jaWFsLmpwZydcclxuICAgIH0sXHJcbiAgICB0aGVtZToge1xyXG4gICAgICBzZXJ2aWNlczogJ3Zrb250YWt0ZSxmYWNlYm9vayx0d2l0dGVyLHRlbGVncmFtJyxcclxuICAgICAgYmFyZTogdHJ1ZSxcclxuICAgICAgbGFuZzogJ3J1J1xyXG4gICAgfSxcclxuICAgIGhvb2tzOiB7XHJcbiAgICAgIG9ucmVhZHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZpbGxJY29ucygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwiLyoqXHJcbiAqIFlvdXR1YmVcclxuICogQG1vZHVsZSBZb3V0dWJlXHJcbiAqL1xyXG5cclxuLy8gSW5pdCBlbXB0eSBhcnJheSBvZiBpZnJhbWUgSURzLCBvbmUgZnJvbSBlYWNoIHZpZGVvXHJcbmxldCBpZnJhbWVJZHMgPSBbXTtcclxuXHJcbi8vIEluaXQgZW1wdHkgYXJyYXkgb2YgaWZyYW1lIFlUIG9iamVjdHMgZm9yIHVzZSBlbHNld2hlcmVcclxuLy8gSGVyZSBJIG9ubHkgdXNlIHRoaXMgdG8gaXRlcmF0ZSB0aHJvdWdoIGFuZCBwYXVzZSBhbGwgdmlkZW9zIHdoZW5cclxuLy8gYW5vdGhlciBiZWdpbnMgcGxheWluZ1xyXG5sZXQgaWZyYW1lT2JqZWN0cyA9IFtdO1xyXG5cclxuXHJcbi8vIFNoYXJlZCBvblJlYWR5IGV2ZW50IHdoaWNoIGFkZHMgZXZlbnRzIHRvIGVhY2ggdmlkZW8ncyBjb3JyZXNwb25kaW5nXHJcbi8vIHBsYXkgYW5kIHN0b3AgYnV0dG9uc1xyXG5mdW5jdGlvbiBvblBsYXllclJlYWR5KGV2ZW50KSB7XHJcbiAgbGV0IGlmcmFtZU9iamVjdCA9IGV2ZW50LnRhcmdldDtcclxuICBsZXQgaWZyYW1lRWxlbWVudCA9IGlmcmFtZU9iamVjdC5hO1xyXG4gIGxldCB2aWRlb0NvbnRhaW5lciA9ICQoaWZyYW1lRWxlbWVudCkuY2xvc2VzdCgnLnl0Jyk7XHJcbiAgbGV0IG1vZGFsID0gdmlkZW9Db250YWluZXIuY2xvc2VzdCgnLm1vZGFsJyk7XHJcbiAgbGV0IHBsYXkgPSB2aWRlb0NvbnRhaW5lci5maW5kKFwiLnBsYXlcIik7XHJcbiAgbGV0IHN0b3AgPSB2aWRlb0NvbnRhaW5lci5maW5kKFwiLnN0b3BcIik7XHJcbiAgXHJcbiAgLy8gUHVzaCBjdXJyZW50IGlmcmFtZSBvYmplY3QgdG8gYXJyYXlcclxuICBpZnJhbWVPYmplY3RzLnB1c2goaWZyYW1lT2JqZWN0KTtcclxuXHJcbiAgcGxheS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gUGF1c2UgYWxsIHZpZGVvcyBjdXJyZW50bHkgcGxheWluZ1xyXG4gICAgaWZyYW1lT2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKHNjb3BlZGlmcmFtZU9iamVjdCkge1xyXG4gICAgICBzY29wZWRpZnJhbWVPYmplY3QucGF1c2VWaWRlbygpO1xyXG4gICAgICBsZXQgc2NvcGVkaWZyYW1lRWxlbWVudCA9IHNjb3BlZGlmcmFtZU9iamVjdC5hO1xyXG4gICAgICBzY29wZWRpZnJhbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzUGxheWluZycpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIFBsYXkgc2VsZWN0ZWQgdmlkZW9cclxuICAgIGlmcmFtZU9iamVjdC5wbGF5VmlkZW8oKTtcclxuICAgIGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXNQbGF5aW5nJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgc3RvcC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWZyYW1lT2JqZWN0LnBhdXNlVmlkZW8oKTtcclxuICAgIGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXNQbGF5aW5nJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgbW9kYWwub24oJ21vZGFsY2xvc2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWZyYW1lT2JqZWN0LnBhdXNlVmlkZW8oKTtcclxuICAgIGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXNQbGF5aW5nJyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBZb3V0dWJlLmluaXQoKTtcclxuICovXHJcblxyXG5mdW5jdGlvbiBpbml0KCl7XHJcblxyXG4gIE1haW4uSGVscGVycy5hZGRTY3JpcHQoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCIpO1xyXG5cclxuXHJcbiAgLy8gRm9yIGVhY2ggaWZyYW1lIHlvdSBmaW5kLCBhZGQgaXRzIElEIHRvIHRoZSBpZnJhbWVJZHMgYXJyYXlcclxuICBsZXQgaWZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXQgaWZyYW1lXCIpO1xyXG4gIGlmcmFtZXMuZm9yRWFjaChmdW5jdGlvbihpZnJhbWUpIHtcclxuICAgIGlmcmFtZUlkcy5wdXNoKGlmcmFtZS5pZCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIE9uY2UgdGhlIFlvdVR1YmUgQVBJIGlzIHJlYWR5LCBmb3IgZWFjaCBpZnJhbWVJZCBpbiB5b3VyIGFycmF5LCBjcmVhdGVcclxuICAvLyBhIG5ldyBZVCBwbGF5ZXIgYW5kIGdpdmUgaXQgdGhlIG9uUmVhZHkgZXZlbnRcclxuICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZnJhbWVJZHMuZm9yRWFjaChmdW5jdGlvbihpZnJhbWVJZCkge1xyXG4gICAgICB2YXIgcGxheWVyID0gbmV3IFlULlBsYXllcihpZnJhbWVJZCwge1xyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgb25SZWFkeTogb25QbGF5ZXJSZWFkeVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwiLyoqXHJcbiAqIFN0YXRpc3RpY1xyXG4gKiBAbW9kdWxlIFN0YXRpc3RpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHNlbmRHYShjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCkge1xyXG4gIGdhKCdzZW5kJywge1xyXG4gICAgICBoaXRUeXBlOiAnZXZlbnQnLFxyXG4gICAgICBldmVudENhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgZXZlbnRBY3Rpb246IGFjdGlvbixcclxuICAgICAgZXZlbnRMYWJlbDogbGFiZWxcclxuICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgJCgnLmJ0bi10aWNrZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnZXh0ZXJuYWwnLCAnY2xpY2snLCAnYnV5X3RpY2tldCcpO1xyXG4gIH0pO1xyXG4gICQoJy5saW5rLWxlbnRhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHNlbmRHYSgnZXh0ZXJuYWwnLCAnY2xpY2snLCAnbGVudGFfbG9nbycpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcjdHJhaWxlcicpLm9uKCdtb2RhbG9wZW4nLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnY2xpY2snLCAnd2F0Y2hfdHJhaWxlcicpO1xyXG4gIH0pO1xyXG4gICQoJyN0cmFpbGVyJykub24oJ21vZGFsY2xvc2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzZW5kR2EoJ2ludGVybmFsJywgJ2NsaWNrJywgJ2Nsb3NlX3RyYWlsZXInKTtcclxuICB9KTtcclxuICAkKCcuYnRuLW1hdGVyaWFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzZW5kR2EoJ2ludGVybmFsJywgJ2NsaWNrJywgJCh0aGlzKS5jbG9zZXN0KCcuc2NyZWVuJykuZGF0YSgnbWF0ZXJpYWwnKSk7XHJcbiAgfSk7XHJcbiAgJCgnLmZwLXNlY3Rpb24nKS5vbignc2VjdGlvbnNjcm9sbGVkJywgZnVuY3Rpb24oZSwgbGFiZWwpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnc2Nyb2xsJywgbGFiZWwpO1xyXG4gIH0pXHJcblxyXG4gIGlmKCQoJy5sYXlvdXQnKS5oYXNDbGFzcygnbGF5b3V0LS1sZW50YScpKSB7XHJcbiAgICBqUXVlcnkuc2Nyb2xsRGVwdGgoKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCwgc2VuZEdhIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3N0YXRpc3RpYy5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyBwbGFjZWhvbGRlciDQsiDRjdC70LXQvNC10L3RgtCw0YUg0YTQvtGA0LzRiyAoLmZpZWxkKVxyXG4gKiBAbW9kdWxlIElucHV0XHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQo9GB0YLQsNC90L7QstC40YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gZm9jdXNMYWJlbChpbnB1dCl7XHJcbiAgICBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKS5hZGRDbGFzcyhcImhhcy1mb2N1c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCj0LHRgNCw0YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gYmx1ckxhYmVsKGlucHV0KXtcclxuICAgIHZhciB3cmFwcGVyID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0J/RgNC+0LLQtdGA0LjRgtGMINC40L3Qv9GD0YIg0L3QsCDQvdCw0LvQuNGH0LjQtSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrSW5wdXQoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIGlmIChpbnB1dC52YWwoKS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgd3JhcHBlci5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQuNC90L/Rg9GC0LBcclxuICogQGV4YW1wbGVcclxuICogSW5wdXQuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgbGV0IGlucHV0cyA9ICQoJy5maWVsZF9faW5wdXQnKTtcclxuICAgIGxldCBwbGFjZWhvbGRlcnMgPSAkKCcuZmllbGRfX3BsYWNlaG9sZGVyJyk7XHJcbiAgICBsZXQgZmxvdyA9ICQoJy5mbG93LXRleHRhcmVhJyk7XHJcbiAgICBcclxuICAgIHBsYWNlaG9sZGVycy5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWVsZCcpLmZpbmQoJy5maWVsZF9faW5wdXQnKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaXRlbSkge1xyXG4gICAgICAgIGNoZWNrSW5wdXQoJChpdGVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZm9jdXMoZnVuY3Rpb24oKXtcclxuICAgICAgICBmb2N1c0xhYmVsKCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmJsdXIoZnVuY3Rpb24oKXtcclxuICAgICAgICBibHVyTGFiZWwoJCh0aGlzKSk7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5idG4tc2VhcmNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJyNzZWFyY2gnKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZmxvdy5vbigna2V5ZG93bicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZsb3cub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbihzZWxmKXtcclxuICAgICAgICAgICAgbGV0IGZsb3dFeCA9ICQoc2VsZikuc2libGluZ3MoJy5mbG93LXRleHRhcmVhLWV4YW1wbGUnKTtcclxuICAgICAgICAgICAgZmxvd0V4Lmh0bWwoJChzZWxmKS52YWwoKS5yZXBsYWNlKC9cXHI/XFxuL2csJzxici8+JykpO1xyXG4gICAgICAgICAgICBpZiAoZmxvdy5vdXRlckhlaWdodCgpICE9PSBmbG93RXgub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgZmxvdy5zdG9wKCkuYW5pbWF0ZSh7J2hlaWdodCc6IGZsb3dFeC5vdXRlckhlaWdodCgpfSwgMzAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwLCB0aGlzKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZm9ybXMuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBOzs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7Ozs7Ozs7O0FDeENBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7Ozs7O0FDL1BBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQzVFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBY0E7QUFDQTs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQVpBO0FBa0JBOzs7Ozs7Ozs7QUN4Q0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hGQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN4Q0E7Ozs7O0FBTUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=