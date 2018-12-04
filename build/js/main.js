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

	    $(window).on('resizeend', function () {
	      if (Main.DeviceDetection.isLandscape()) {
	        $('html, body').css('overflow-y', 'hidden');
	        $('html').addClass('rotate');
	        $('.page-rotate').fadeIn(500);
	      } else {
	        $('.page-rotate').fadeOut(500);
	        $('html').removeClass('rotate');
	        $('html, body').css('overflow-y', '');
	      }
	    });
	  }

	  if ($('.layout').outerHeight() > window.outerHeight) {
	    $('.layout').css({ 'padding-right': getNativeScrollbarWidth() + 'px' });
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

	"use strict";

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	function clearStyle(el) {
	  $(el).css({ "transform": "" });
	}

	function init() {

	  if (Main.DeviceDetection.isMobile()) {
	    $('.page-animate__item').each(function (index) {
	      $(this).css({ 'margin-bottom': $('.project').eq(index).find('.project__info').outerHeight() });
	    });
	  }

	  $('.anim-link').on('click', function (e) {
	    e.preventDefault();
	    $('html').addClass('is-animating animation-start');
	    setTimeout(function (self) {
	      self.trigger('animation-done');
	    }, 2000, $(this));
	  });

	  $('.anim-link').on('animation-done', function () {
	    // request here
	    // .on('success')
	    $('html').addClass('animation-end');
	    setTimeout(function () {
	      $('html').removeClass('is-animating animation-start animation-end');
	    }, 2000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3OWM2ODMwYjVkZDU3OWNmNTFhMSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zdGF0aXN0aWMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm1zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3OWM2ODMwYjVkZDU3OWNmNTFhMSIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBTaGFyZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2hhcmVcIik7XHJcbmxldCBZb3V0dWJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy95b3V0dWJlXCIpO1xyXG5sZXQgU3RhdGlzdGljID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdGF0aXN0aWNcIik7XHJcbmxldCBGb3JtcyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybXNcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBTaGFyZS5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIFxyXG4gICQuYWZ0ZXJsYWcoZnVuY3Rpb24oKXtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgQW5pbWF0aW9uLmluaXQoKTtcclxuICBGb3Jtcy5pbml0KCk7XHJcblxyXG4gIC8qXHJcbiAgaWYgKCh3aW5kb3cuaW5uZXJXaWR0aCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHx8ICEkKCdodG1sJykuaGFzQ2xhc3MoJ2ZwLWVuYWJsZWQnKSkge1xyXG4gICAgJCgnLmxheW91dCwgLmhlYWRlcicpLmNzcyh7J3BhZGRpbmctcmlnaHQnOiBIZWxwZXJzLmdldE5hdGl2ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnfSk7XHJcbiAgfVxyXG4gICovXHJcblxyXG4gIFlvdXR1YmUuaW5pdCgpO1xyXG4gIFN0YXRpc3RpYy5pbml0KCk7XHJcbiAgXHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC/0LjRgdC+0Log0Y3QutGB0L/QvtGA0YLQuNGA0YPQtdC80YvRhSDQvNC+0LTRg9C70LXQuSwg0YfRgtC+0LHRiyDQuNC80LXRgtGMINC6INC90LjQvCDQtNC+0YHRgtGD0L8g0LjQt9Cy0L3QtVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluLkZvcm0uaXNGb3JtVmFsaWQoKTtcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIERldmljZURldGVjdGlvbixcclxuICBIZWxwZXJzLFxyXG5cdENhcm91c2VsLFxyXG4gIFNoYXJlLFxyXG4gIEFuaW1hdGlvbixcclxuICBZb3V0dWJlLFxyXG4gIFN0YXRpc3RpYyxcclxuICBGb3Jtc1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbWFpbi5qcyIsImxldCBicmVha3BvaW50cyA9IHtcclxuICBzbTogNzY4LFxyXG4gIG1kOiAxMDI0LFxyXG4gIGxnOiAxMjgwLFxyXG4gIHhsOiAxNjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc1BvcnRyYWl0KCkge1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPCAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wRXh0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3AoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHJ1bixcclxuICBpc1RvdWNoLFxyXG4gIGlzTW9iaWxlLFxyXG4gIGlzVGFibGV0LFxyXG4gIGlzRGVza3RvcCxcclxuICBpc0Rlc2t0b3BFeHQsXHJcbiAgaXNNb2JpbGVWZXJzaW9uLFxyXG4gIGlzUG9ydHJhaXQsXHJcbiAgaXNMYW5kc2NhcGVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqIEBtb2R1bGUgSGVscGVyc1xyXG4gKi9cclxuXHJcbi8vIEFkZCBzY3JpcHQgYXN5bmhcclxuZnVuY3Rpb24gYWRkU2NyaXB0ICh1cmwpIHtcclxuICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICB0YWcuc3JjID0gdXJsO1xyXG4gIHZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO1xyXG4gIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHNjcm9sbGJhciB3aWR0aCBpbiBlbGVtZW50XHJcbiAqIC0gaWYgdGhlIHdpZHRoIGlzIDAgaXQgbWVhbnMgdGhlIHNjcm9sbGJhciBpcyBmbG9hdGVkL292ZXJsYXllZFxyXG4gKiAtIGFjY2VwdHMgXCJjb250YWluZXJcIiBwYXJlbWV0ZXIgYmVjYXVzZSBpZSAmIGVkZ2UgY2FuIGhhdmUgZGlmZmVyZW50XHJcbiAqICAgc2Nyb2xsYmFyIGJlaGF2aW9ycyBmb3IgZGlmZmVyZW50IGVsZW1lbnRzIHVzaW5nICctbXMtb3ZlcmZsb3ctc3R5bGUnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCAoY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGxldCBmdWxsV2lkdGggPSAwO1xyXG4gIGxldCBiYXJXaWR0aCA9IDA7XHJcblxyXG4gIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbGV0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHdyYXBwZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICB3cmFwcGVyLnN0eWxlLmJvdHRvbSA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICBmdWxsV2lkdGggPSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gIGJhcldpZHRoID0gZnVsbFdpZHRoIC0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcblxyXG4gIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgcmV0dXJuIGJhcldpZHRoO1xyXG59XHJcblxyXG4vKipcclxuICogVGhyb3R0bGUgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcclxuICB0aHJlc2hob2xkIHx8ICh0aHJlc2hob2xkID0gMjUwKTtcclxuICBsZXQgbGFzdCxcclxuICAgIGRlZmVyVGltZXI7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gc2NvcGUgfHwgdGhpcztcclxuXHJcbiAgICBsZXQgbm93ID0gK25ldyBEYXRlKCksXHJcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xyXG4gICAgICAvLyBob2xkIG9uIHRvIGl0XHJcbiAgICAgIGNsZWFyVGltZW91dChkZWZlclRpbWVyKTtcclxuICAgICAgZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIH0sIHRocmVzaGhvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogXHJcbiAqIERlYm91bmNlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgbGV0IHRpbWVyID0gbnVsbDtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH07XHJcbn07XHJcblxyXG5sZXQgdGltZXI7XHJcbmxldCB0aW1lb3V0ID0gZmFsc2U7XHJcbmxldCBkZWx0YSA9IDIwMDtcclxuZnVuY3Rpb24gcmVzaXplRW5kKCkge1xyXG4gIGlmIChuZXcgRGF0ZSgpIC0gdGltZXIgPCBkZWx0YSkge1xyXG4gICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZW91dCA9IGZhbHNlO1xyXG4gICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZWVuZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKiBNb2RhbHMgKi9cclxuZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsKSB7XHJcbiAgaWYgKG1vZGFsKSB7XHJcbiAgICBsZXQgd2luID0gbW9kYWwuZmluZCgnLm1vZGFsX193aW5kb3cnKTtcclxuICAgIG1vZGFsLmZhZGVJbig1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgIHdpbi5mYWRlSW4oNTAwKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsb3BlbmVkJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICB3aW4uZmFkZU91dCg1MDApO1xyXG4gICAgbW9kYWwuZmFkZU91dCg1MDApO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgIG1vZGFsLnRyaWdnZXIoJ21vZGFsY2xvc2VkJylcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcignV2hpY2ggbW9kYWw/Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID09PSAnc2VsZicgPyAkKHRoaXMpLnBhcmVudCgpIDogJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKTtcclxuICAgIHRhcmdldC5mYWRlT3V0KDUwMCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHRhcmdldCA9ICEhJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA/ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkgOiAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgbGV0IG1vZGFsID0gdGFyZ2V0LnBhcmVudCgnLm1vZGFsJyk7XHJcbiAgICBjbG9zZU1vZGFsKG1vZGFsKVxyXG4gIH0pO1xyXG5cclxuICAkKCcubW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGNsb3NlTW9kYWwoJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idG4tbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA9PT0gJ3NlbGYnID8gJCh0aGlzKS5wYXJlbnQoKSA6ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuTW9kYWwodGFyZ2V0KTtcclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWVyID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcblxyXG4gIGlmICgkKCcubGF5b3V0JykuaGFzQ2xhc3MoJ2xheW91dC0taG9tZScpICYmIE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkpIHtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygncm90YXRlJyk7XHJcbiAgICAgICQoJy5wYWdlLXJvdGF0ZScpLmZhZGVJbig1MDApO1xyXG4gICAgfVxyXG5cclxuICAgICQod2luZG93KS5vbigncmVzaXplZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygncm90YXRlJyk7XHJcbiAgICAgICAgJCgnLnBhZ2Utcm90YXRlJykuZmFkZUluKDUwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnLnBhZ2Utcm90YXRlJykuZmFkZU91dCg1MDApO1xyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygncm90YXRlJyk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoJCgnLmxheW91dCcpLm91dGVySGVpZ2h0KCkgPiB3aW5kb3cub3V0ZXJIZWlnaHQpIHtcclxuICAgICQoJy5sYXlvdXQnKS5jc3MoeydwYWRkaW5nLXJpZ2h0JzogZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGgoKSArICdweCd9KTtcclxuICB9XHJcbiAgXHJcbiAgJCgnLmJ0bi1vcGVuLWFzaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCcuYXNpZGUnKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdhc2lkZS1pcy1vcGVuJyk7XHJcbiAgICBpZiAoJCgnLmxheW91dCcpLm91dGVySGVpZ2h0KCkgPiB3aW5kb3cub3V0ZXJIZWlnaHQpIHtcclxuICAgICAgJCgnLmhlYWRlciwgLnNpZGViYXInKS5jc3MoeydyaWdodCc6IGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnfSk7XHJcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgJCgnLmJ0bi1jbG9zZS1hc2lkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnLmFzaWRlJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnYXNpZGUtaXMtb3BlbicpO1xyXG4gICAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAgICQoJy5oZWFkZXIsIC5zaWRlYmFyJykuY3NzKHsncmlnaHQnOiAnMHB4J30pO1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLWFjY29yZGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGFjY29yZGlvbiA9ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICBhY2NvcmRpb24udG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKS5zbGlkZVRvZ2dsZSg1MDApO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIHRydWUsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaW5pdCwgXHJcbiAgZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGgsXHJcbiAgdG9nZ2xlQ2xhc3NJZiwgXHJcbiAgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwsIFxyXG4gIGFkZFNjcmlwdCwgXHJcbiAgb3Blbk1vZGFsLCBcclxuICBjbG9zZU1vZGFsXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCIvKipcclxuICog0J/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L4g0YDQsNC30LvQuNGH0L3Ri9C8INGB0L7QsdGL0YLQuNGP0LxcclxuICogQG1vZHVsZSBBbmltYXRpb25cclxuICovXHJcblxyXG5cclxuZnVuY3Rpb24gY2xlYXJTdHlsZSAoZWwpIHtcclxuICAkKGVsKS5jc3Moe1widHJhbnNmb3JtXCI6IFwiXCJ9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCAoKSB7XHJcblxyXG4gIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpKSB7XHJcbiAgICAkKCcucGFnZS1hbmltYXRlX19pdGVtJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAkKHRoaXMpLmNzcyh7J21hcmdpbi1ib3R0b20nOiAkKCcucHJvamVjdCcpLmVxKGluZGV4KS5maW5kKCcucHJvamVjdF9faW5mbycpLm91dGVySGVpZ2h0KCl9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgJCgnLmFuaW0tbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtYW5pbWF0aW5nIGFuaW1hdGlvbi1zdGFydCcpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbihzZWxmKXtcclxuICAgICAgc2VsZi50cmlnZ2VyKCdhbmltYXRpb24tZG9uZScpO1xyXG4gICAgfSwgMjAwMCwgJCh0aGlzKSk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5hbmltLWxpbmsnKS5vbignYW5pbWF0aW9uLWRvbmUnLCBmdW5jdGlvbigpe1xyXG4gICAgLy8gcmVxdWVzdCBoZXJlXHJcbiAgICAvLyAub24oJ3N1Y2Nlc3MnKVxyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdhbmltYXRpb24tZW5kJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLWFuaW1hdGluZyBhbmltYXRpb24tc3RhcnQgYW5pbWF0aW9uLWVuZCcpO1xyXG4gICAgfSwgMjAwMCk7XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIiwiLyoqXHJcbiAqINCa0LDRgNGD0YHQtdC70YxcclxuICogQG1vZHVsZSBDYXJvdXNlbFxyXG4gKi9cclxuXHJcbmxldCBjYXJvdXNlbERlZjtcclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YDRg9GB0LXQu9C4XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgY2Fyb3VzZWxEZWYgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0tZGVmYXVsdFwiKTtcclxuXHJcbiAgY2Fyb3VzZWxEZWYub3dsQ2Fyb3VzZWwoe1xyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBtYXJnaW46IDAsXHJcbiAgICBuYXY6IGZhbHNlLFxyXG4gICAgbmF2VGV4dDogWycnLCAnJ10sXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgbGF6eUxvYWQ6IHRydWUsXHJcbiAgICBsYXp5TG9hZEVhZ2VyOiAxLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gIH0pO1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwiZnVuY3Rpb24gZ2V0SWNvbihlbCkge1xyXG4gIGxldCBpY29uID0gJyc7XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV92a29udGFrdGUnKSkge1xyXG4gICAgaWNvbiA9ICd2ayc7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfZmFjZWJvb2snKSkge1xyXG4gICAgaWNvbiA9ICdmYic7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdHdpdHRlcicpKSB7XHJcbiAgICBpY29uID0gJ3R3JztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV90ZWxlZ3JhbScpKSB7XHJcbiAgICBpY29uID0gJ3RnJztcclxuICB9XHJcbiAgcmV0dXJuICc8c3ZnIGNsYXNzPVwiaWNvbiBzb2NpYWwtaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiMnICsgaWNvbiArICdcIi8+PC9zdmc+JztcclxufVxyXG5mdW5jdGlvbiBmaWxsSWNvbnMoKSB7XHJcbiAgJCgnI3NoYXJlIC55YS1zaGFyZTJfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy55YS1zaGFyZTJfX2ljb24nKS5odG1sKGdldEljb24oJCh0aGlzKSkpO1xyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgWWEuc2hhcmUyKCdzaGFyZScsIHtcclxuICAgIGNvbnRlbnQ6IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcclxuICAgICAgdGl0bGU6ICfQmtGA0YPRh9C1INC40YUg0LzRg9C30YvQutC4INGC0L7Qu9GM0LrQviDQuNGFINC40YHRgtC+0YDQuNGPJyxcclxuICAgICAgZGVzY3JpcHRpb246IFwi0JIg0L7QttC40LTQsNC90LjQuCDRhNC40LvRjNC80LAgwqvQkdC+0LPQtdC80YHQutCw0Y8g0YDQsNC/0YHQvtC00LjRj8K7INC/0YDQviDQpNGA0LXQtNC00Lgg0JzQtdGA0LrRjNGO0YDQuCDQuCDQs9GA0YPQv9C/0YsgUXVlZW4gwqvQm9C10L3RgtCwLtGA0YPCuyDRgNCw0YHRgdC60LDQt9GL0LLQsNC10YIg0L4g0YHQsNC80YvRhSDQuNC90YLQtdGA0LXRgdC90YvRhSDQuCDQvdC10L7QttC40LTQsNC90L3Ri9GFINGE0LDQutGC0LDRhSDQuNC3INC20LjQt9C90Lgg0LLQtdC70LjQutC+0LPQviDQvNGD0LfRi9C60LDQvdGC0LBcIixcclxuICAgICAgaW1hZ2U6ICdodHRwOi8vYm9oZW1pYW5yaGFwc29keS5sZW50YS5ydS9zb2NpYWwuanBnJ1xyXG4gICAgfSxcclxuICAgIHRoZW1lOiB7XHJcbiAgICAgIHNlcnZpY2VzOiAndmtvbnRha3RlLGZhY2Vib29rLHR3aXR0ZXIsdGVsZWdyYW0nLFxyXG4gICAgICBiYXJlOiB0cnVlLFxyXG4gICAgICBsYW5nOiAncnUnXHJcbiAgICB9LFxyXG4gICAgaG9va3M6IHtcclxuICAgICAgb25yZWFkeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZmlsbEljb25zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvc2hhcmUuanMiLCIvKipcclxuICogWW91dHViZVxyXG4gKiBAbW9kdWxlIFlvdXR1YmVcclxuICovXHJcblxyXG4vLyBJbml0IGVtcHR5IGFycmF5IG9mIGlmcmFtZSBJRHMsIG9uZSBmcm9tIGVhY2ggdmlkZW9cclxubGV0IGlmcmFtZUlkcyA9IFtdO1xyXG5cclxuLy8gSW5pdCBlbXB0eSBhcnJheSBvZiBpZnJhbWUgWVQgb2JqZWN0cyBmb3IgdXNlIGVsc2V3aGVyZVxyXG4vLyBIZXJlIEkgb25seSB1c2UgdGhpcyB0byBpdGVyYXRlIHRocm91Z2ggYW5kIHBhdXNlIGFsbCB2aWRlb3Mgd2hlblxyXG4vLyBhbm90aGVyIGJlZ2lucyBwbGF5aW5nXHJcbmxldCBpZnJhbWVPYmplY3RzID0gW107XHJcblxyXG5cclxuLy8gU2hhcmVkIG9uUmVhZHkgZXZlbnQgd2hpY2ggYWRkcyBldmVudHMgdG8gZWFjaCB2aWRlbydzIGNvcnJlc3BvbmRpbmdcclxuLy8gcGxheSBhbmQgc3RvcCBidXR0b25zXHJcbmZ1bmN0aW9uIG9uUGxheWVyUmVhZHkoZXZlbnQpIHtcclxuICBsZXQgaWZyYW1lT2JqZWN0ID0gZXZlbnQudGFyZ2V0O1xyXG4gIGxldCBpZnJhbWVFbGVtZW50ID0gaWZyYW1lT2JqZWN0LmE7XHJcbiAgbGV0IHZpZGVvQ29udGFpbmVyID0gJChpZnJhbWVFbGVtZW50KS5jbG9zZXN0KCcueXQnKTtcclxuICBsZXQgbW9kYWwgPSB2aWRlb0NvbnRhaW5lci5jbG9zZXN0KCcubW9kYWwnKTtcclxuICBsZXQgcGxheSA9IHZpZGVvQ29udGFpbmVyLmZpbmQoXCIucGxheVwiKTtcclxuICBsZXQgc3RvcCA9IHZpZGVvQ29udGFpbmVyLmZpbmQoXCIuc3RvcFwiKTtcclxuICBcclxuICAvLyBQdXNoIGN1cnJlbnQgaWZyYW1lIG9iamVjdCB0byBhcnJheVxyXG4gIGlmcmFtZU9iamVjdHMucHVzaChpZnJhbWVPYmplY3QpO1xyXG5cclxuICBwbGF5Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBQYXVzZSBhbGwgdmlkZW9zIGN1cnJlbnRseSBwbGF5aW5nXHJcbiAgICBpZnJhbWVPYmplY3RzLmZvckVhY2goZnVuY3Rpb24oc2NvcGVkaWZyYW1lT2JqZWN0KSB7XHJcbiAgICAgIHNjb3BlZGlmcmFtZU9iamVjdC5wYXVzZVZpZGVvKCk7XHJcbiAgICAgIGxldCBzY29wZWRpZnJhbWVFbGVtZW50ID0gc2NvcGVkaWZyYW1lT2JqZWN0LmE7XHJcbiAgICAgIHNjb3BlZGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXNQbGF5aW5nJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gUGxheSBzZWxlY3RlZCB2aWRlb1xyXG4gICAgaWZyYW1lT2JqZWN0LnBsYXlWaWRlbygpO1xyXG4gICAgaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpc1BsYXlpbmcnKTtcclxuICB9KTtcclxuICBcclxuICBzdG9wLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBpZnJhbWVPYmplY3QucGF1c2VWaWRlbygpO1xyXG4gICAgaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpc1BsYXlpbmcnKTtcclxuICB9KTtcclxuICBcclxuICBtb2RhbC5vbignbW9kYWxjbG9zZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZnJhbWVPYmplY3QucGF1c2VWaWRlbygpO1xyXG4gICAgaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpc1BsYXlpbmcnKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIFlvdXR1YmUuaW5pdCgpO1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcbiAgTWFpbi5IZWxwZXJzLmFkZFNjcmlwdChcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIik7XHJcblxyXG5cclxuICAvLyBGb3IgZWFjaCBpZnJhbWUgeW91IGZpbmQsIGFkZCBpdHMgSUQgdG8gdGhlIGlmcmFtZUlkcyBhcnJheVxyXG4gIGxldCBpZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55dCBpZnJhbWVcIik7XHJcbiAgaWZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGlmcmFtZSkge1xyXG4gICAgaWZyYW1lSWRzLnB1c2goaWZyYW1lLmlkKTtcclxuICB9KTtcclxuXHJcbiAgLy8gT25jZSB0aGUgWW91VHViZSBBUEkgaXMgcmVhZHksIGZvciBlYWNoIGlmcmFtZUlkIGluIHlvdXIgYXJyYXksIGNyZWF0ZVxyXG4gIC8vIGEgbmV3IFlUIHBsYXllciBhbmQgZ2l2ZSBpdCB0aGUgb25SZWFkeSBldmVudFxyXG4gIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmcmFtZUlkcy5mb3JFYWNoKGZ1bmN0aW9uKGlmcmFtZUlkKSB7XHJcbiAgICAgIHZhciBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGlmcmFtZUlkLCB7XHJcbiAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICBvblJlYWR5OiBvblBsYXllclJlYWR5XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3lvdXR1YmUuanMiLCIvKipcclxuICogU3RhdGlzdGljXHJcbiAqIEBtb2R1bGUgU3RhdGlzdGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gc2VuZEdhKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsKSB7XHJcbiAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgIGhpdFR5cGU6ICdldmVudCcsXHJcbiAgICAgIGV2ZW50Q2F0ZWdvcnk6IGNhdGVnb3J5LFxyXG4gICAgICBldmVudEFjdGlvbjogYWN0aW9uLFxyXG4gICAgICBldmVudExhYmVsOiBsYWJlbFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAkKCcuYnRuLXRpY2tldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2VuZEdhKCdleHRlcm5hbCcsICdjbGljaycsICdidXlfdGlja2V0Jyk7XHJcbiAgfSk7XHJcbiAgJCgnLmxpbmstbGVudGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgc2VuZEdhKCdleHRlcm5hbCcsICdjbGljaycsICdsZW50YV9sb2dvJyk7XHJcbiAgfSk7XHJcblxyXG4gICQoJyN0cmFpbGVyJykub24oJ21vZGFsb3BlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2VuZEdhKCdpbnRlcm5hbCcsICdjbGljaycsICd3YXRjaF90cmFpbGVyJyk7XHJcbiAgfSk7XHJcbiAgJCgnI3RyYWlsZXInKS5vbignbW9kYWxjbG9zZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnY2xpY2snLCAnY2xvc2VfdHJhaWxlcicpO1xyXG4gIH0pO1xyXG4gICQoJy5idG4tbWF0ZXJpYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnY2xpY2snLCAkKHRoaXMpLmNsb3Nlc3QoJy5zY3JlZW4nKS5kYXRhKCdtYXRlcmlhbCcpKTtcclxuICB9KTtcclxuICAkKCcuZnAtc2VjdGlvbicpLm9uKCdzZWN0aW9uc2Nyb2xsZWQnLCBmdW5jdGlvbihlLCBsYWJlbCkge1xyXG4gICAgc2VuZEdhKCdpbnRlcm5hbCcsICdzY3JvbGwnLCBsYWJlbCk7XHJcbiAgfSlcclxuXHJcbiAgaWYoJCgnLmxheW91dCcpLmhhc0NsYXNzKCdsYXlvdXQtLWxlbnRhJykpIHtcclxuICAgIGpRdWVyeS5zY3JvbGxEZXB0aCgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBpbml0LCBzZW5kR2EgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvc3RhdGlzdGljLmpzIiwiLyoqXHJcbiAqINCc0L7QtNGD0LvRjCDQtNC70Y8g0YDQsNCx0L7RgtGLIHBsYWNlaG9sZGVyINCyINGN0LvQtdC80LXQvdGC0LDRhSDRhNC+0YDQvNGLICguZmllbGQpXHJcbiAqIEBtb2R1bGUgSW5wdXRcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINCj0YHRgtCw0L3QvtCy0LjRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBmb2N1c0xhYmVsKGlucHV0KXtcclxuICAgIGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpLmFkZENsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0KPQsdGA0LDRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBibHVyTGFiZWwoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQn9GA0L7QstC10YDQuNGC0Ywg0LjQvdC/0YPRgiDQvdCwINC90LDQu9C40YfQuNC1IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgaWYgKGlucHV0LnZhbCgpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC40L3Qv9GD0YLQsFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBJbnB1dC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBsZXQgaW5wdXRzID0gJCgnLmZpZWxkX19pbnB1dCcpO1xyXG4gICAgbGV0IHBsYWNlaG9sZGVycyA9ICQoJy5maWVsZF9fcGxhY2Vob2xkZXInKTtcclxuICAgIGxldCBmbG93ID0gJCgnLmZsb3ctdGV4dGFyZWEnKTtcclxuICAgIFxyXG4gICAgcGxhY2Vob2xkZXJzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmZpZWxkJykuZmluZCgnLmZpZWxkX19pbnB1dCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKGl0ZW0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvY3VzTGFiZWwoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuYmx1cihmdW5jdGlvbigpe1xyXG4gICAgICAgIGJsdXJMYWJlbCgkKHRoaXMpKTtcclxuICAgICAgICBjaGVja0lucHV0KCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmJ0bi1zZWFyY2gnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnI3NlYXJjaCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmbG93Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZmxvdy5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKHNlbGYpe1xyXG4gICAgICAgICAgICBsZXQgZmxvd0V4ID0gJChzZWxmKS5zaWJsaW5ncygnLmZsb3ctdGV4dGFyZWEtZXhhbXBsZScpO1xyXG4gICAgICAgICAgICBmbG93RXguaHRtbCgkKHNlbGYpLnZhbCgpLnJlcGxhY2UoL1xccj9cXG4vZywnPGJyLz4nKSk7XHJcbiAgICAgICAgICAgIGlmIChmbG93Lm91dGVySGVpZ2h0KCkgIT09IGZsb3dFeC5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBmbG93LnN0b3AoKS5hbmltYXRlKHsnaGVpZ2h0JzogZmxvd0V4Lm91dGVySGVpZ2h0KCl9LCAzMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAsIHRoaXMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9mb3Jtcy5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTs7Ozs7Ozs7QUN4Q0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7Ozs7O0FDalFBOzs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDcENBOzs7OztBQUtBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWEE7QUFjQTtBQUNBOzs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBWkE7QUFrQkE7Ozs7Ozs7OztBQ3hDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaEZBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3hDQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==