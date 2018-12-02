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

	  $('html').addClass('is-animating');

	  //Animation.init();
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
	  sm: 767,
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

	  var accordionInitialHeight = void 0;
	  $('.btn-accordion').on('click', function () {
	    var accordion = $(this).closest('.accordion');
	    var accordionFinalHeight = accordion[0].scrollHeight;
	    if (accordion.hasClass('is-open')) {
	      accordion.animate({ 'height': accordionInitialHeight }, 500);
	    } else {
	      accordionInitialHeight = accordion.outerHeight();
	      accordion.animate({ 'height': accordionFinalHeight }, 500);
	    }
	    accordion.toggleClass('is-open');
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

	var welcome = $('.js-welcome');

	function clearStyle(el) {
	  $(el).css({ "transform": "" });
	}

	function welcomeAnimation() {
	  setTimeout(function () {
	    welcome.addClass('start');
	  }, 100);
	  setTimeout(function () {
	    welcome.addClass('end');
	    welcome.trigger('animend');
	  }, 2000);
	  setTimeout(function () {
	    welcome.trigger('animdone');
	  }, 3000);
	}

	function init() {

	  welcomeAnimation();

	  welcome.on('animend', function () {
	    $('body').addClass('welcome-end');
	  });
	  welcome.on('animdone', function () {
	    $('body').addClass('welcome-done');
	  });

	  $('.fullpage').fullpage({
	    navigation: true,
	    navigationPosition: 'left',
	    onLeave: function onLeave(origin, destination, direction) {
	      if (destination !== 1) {
	        var label = 'material_' + (destination - 1);
	        this.trigger('sectionscrolled', label);
	      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZWIxYzdkNWI0NWNkMzFlMzZhYiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zdGF0aXN0aWMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm1zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5ZWIxYzdkNWI0NWNkMzFlMzZhYiIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBTaGFyZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2hhcmVcIik7XHJcbmxldCBZb3V0dWJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy95b3V0dWJlXCIpO1xyXG5sZXQgU3RhdGlzdGljID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdGF0aXN0aWNcIik7XHJcbmxldCBGb3JtcyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybXNcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBTaGFyZS5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIFxyXG4gICQuYWZ0ZXJsYWcoZnVuY3Rpb24oKXtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICBcclxuICAvL0FuaW1hdGlvbi5pbml0KCk7XHJcbiAgRm9ybXMuaW5pdCgpO1xyXG5cclxuICAvKlxyXG4gIGlmICgod2luZG93LmlubmVyV2lkdGggPiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSB8fCAhJCgnaHRtbCcpLmhhc0NsYXNzKCdmcC1lbmFibGVkJykpIHtcclxuICAgICQoJy5sYXlvdXQsIC5oZWFkZXInKS5jc3MoeydwYWRkaW5nLXJpZ2h0JzogSGVscGVycy5nZXROYXRpdmVTY3JvbGxiYXJXaWR0aCgpICsgJ3B4J30pO1xyXG4gIH1cclxuICAqL1xyXG5cclxuICBZb3V0dWJlLmluaXQoKTtcclxuICBTdGF0aXN0aWMuaW5pdCgpO1xyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuXHRDYXJvdXNlbCxcclxuICBTaGFyZSxcclxuICBBbmltYXRpb24sXHJcbiAgWW91dHViZSxcclxuICBTdGF0aXN0aWMsXHJcbiAgRm9ybXNcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL21haW4uanMiLCJsZXQgYnJlYWtwb2ludHMgPSB7XHJcbiAgc206IDc2NyxcclxuICBtZDogMTAyNCxcclxuICBsZzogMTI4MCxcclxuICB4bDogMTYwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNQb3J0cmFpdCgpIHtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDwgJCh3aW5kb3cpLmhlaWdodCgpKTtcclxufVxyXG5mdW5jdGlvbiBpc0xhbmRzY2FwZSgpIHtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKTtcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzRGVza3RvcEV4dCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZVZlcnNpb24oKXtcclxuICByZXR1cm4gISF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcIi9tb2JpbGUvXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBydW4oKXtcclxuICBpZihpc1RvdWNoKCkpe1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby10b3VjaCcpLmFkZENsYXNzKCd0b3VjaCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3RvdWNoJykuYWRkQ2xhc3MoJ25vLXRvdWNoJyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBydW4sXHJcbiAgaXNUb3VjaCxcclxuICBpc01vYmlsZSxcclxuICBpc1RhYmxldCxcclxuICBpc0Rlc2t0b3AsXHJcbiAgaXNEZXNrdG9wRXh0LFxyXG4gIGlzTW9iaWxlVmVyc2lvbixcclxuICBpc1BvcnRyYWl0LFxyXG4gIGlzTGFuZHNjYXBlXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCIvKipcclxuICogSGVscGVyc1xyXG4gKiBAbW9kdWxlIEhlbHBlcnNcclxuICovXHJcblxyXG4vLyBBZGQgc2NyaXB0IGFzeW5oXHJcbmZ1bmN0aW9uIGFkZFNjcmlwdCAodXJsKSB7XHJcbiAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgdGFnLnNyYyA9IHVybDtcclxuICB2YXIgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtcclxuICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRocm90dGxlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XHJcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XHJcbiAgbGV0IGxhc3QsXHJcbiAgICBkZWZlclRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XHJcblxyXG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcclxuICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XHJcbiAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9LCB0aHJlc2hob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIFxyXG4gKiBEZWJvdW5jZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gIGxldCB0aW1lciA9IG51bGw7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59O1xyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogTW9kYWxzICovXHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICBtb2RhbC5mYWRlSW4oNTAwKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB3aW4uZmFkZUluKDUwMCk7XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbG9wZW5lZCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdXaGljaCBtb2RhbD8nKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcclxuICBpZiAobW9kYWwpIHtcclxuICAgIGxldCB3aW4gPSBtb2RhbC5maW5kKCcubW9kYWxfX3dpbmRvdycpO1xyXG4gICAgd2luLmZhZGVPdXQoNTAwKTtcclxuICAgIG1vZGFsLmZhZGVPdXQoNTAwKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbGNsb3NlZCcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBIZWxwZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksIDUwKTtcclxuICBcclxuICAkKCcuanMtaGlkZS1ibG9jaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA9PT0gJ3NlbGYnID8gJCh0aGlzKS5wYXJlbnQoKSA6ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgICB0YXJnZXQuZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLWNsb3NlLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCB0YXJnZXQgPSAhISQodGhpcykuZGF0YSgndGFyZ2V0JykgPyAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpIDogJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgIGxldCBtb2RhbCA9IHRhcmdldC5wYXJlbnQoJy5tb2RhbCcpO1xyXG4gICAgY2xvc2VNb2RhbChtb2RhbClcclxuICB9KTtcclxuXHJcbiAgJCgnLm1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjbG9zZU1vZGFsKCQodGhpcykpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3Blbk1vZGFsKHRhcmdldCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aW1lciA9IG5ldyBEYXRlKCk7XHJcbiAgICBpZiAodGltZW91dCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGltZW91dCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cclxuICBpZiAoJCgnLmxheW91dCcpLmhhc0NsYXNzKCdsYXlvdXQtLWhvbWUnKSAmJiBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpKSB7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3JvdGF0ZScpO1xyXG4gICAgICAkKCcucGFnZS1yb3RhdGUnKS5mYWRlSW4oNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZWVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3JvdGF0ZScpO1xyXG4gICAgICAgICQoJy5wYWdlLXJvdGF0ZScpLmZhZGVJbig1MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5wYWdlLXJvdGF0ZScpLmZhZGVPdXQoNTAwKTtcclxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3JvdGF0ZScpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAkKCcubGF5b3V0JykuY3NzKHsncGFkZGluZy1yaWdodCc6IGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnfSk7XHJcbiAgfVxyXG4gIFxyXG4gICQoJy5idG4tb3Blbi1hc2lkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnLmFzaWRlJykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYXNpZGUtaXMtb3BlbicpO1xyXG4gICAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAgICQoJy5oZWFkZXIsIC5zaWRlYmFyJykuY3NzKHsncmlnaHQnOiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCgpICsgJ3B4J30pO1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQoJy5idG4tY2xvc2UtYXNpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJy5hc2lkZScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2FzaWRlLWlzLW9wZW4nKTtcclxuICAgIGlmICgkKCcubGF5b3V0Jykub3V0ZXJIZWlnaHQoKSA+IHdpbmRvdy5vdXRlckhlaWdodCkge1xyXG4gICAgICAkKCcuaGVhZGVyLCAuc2lkZWJhcicpLmNzcyh7J3JpZ2h0JzogJzBweCd9KTtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbGV0IGFjY29yZGlvbkluaXRpYWxIZWlnaHQ7XHJcbiAgJCgnLmJ0bi1hY2NvcmRpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBhY2NvcmRpb24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5hY2NvcmRpb24nKTtcclxuICAgIGxldCBhY2NvcmRpb25GaW5hbEhlaWdodCA9IGFjY29yZGlvblswXS5zY3JvbGxIZWlnaHQ7XHJcbiAgICBpZiAoYWNjb3JkaW9uLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgYWNjb3JkaW9uLmFuaW1hdGUoeydoZWlnaHQnOiBhY2NvcmRpb25Jbml0aWFsSGVpZ2h0fSwgNTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFjY29yZGlvbkluaXRpYWxIZWlnaHQgPSBhY2NvcmRpb24ub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgYWNjb3JkaW9uLmFuaW1hdGUoeydoZWlnaHQnOiBhY2NvcmRpb25GaW5hbEhlaWdodH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgICBhY2NvcmRpb24udG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICB9KVxyXG4gIFxyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIHRydWUsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgaW5pdCwgXHJcbiAgZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGgsXHJcbiAgdG9nZ2xlQ2xhc3NJZiwgXHJcbiAgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwsIFxyXG4gIGFkZFNjcmlwdCwgXHJcbiAgb3Blbk1vZGFsLCBcclxuICBjbG9zZU1vZGFsXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCIvKipcclxuICog0J/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L4g0YDQsNC30LvQuNGH0L3Ri9C8INGB0L7QsdGL0YLQuNGP0LxcclxuICogQG1vZHVsZSBBbmltYXRpb25cclxuICovXHJcblxyXG5sZXQgd2VsY29tZSA9ICQoJy5qcy13ZWxjb21lJyk7XHJcblxyXG5mdW5jdGlvbiBjbGVhclN0eWxlIChlbCkge1xyXG4gICQoZWwpLmNzcyh7XCJ0cmFuc2Zvcm1cIjogXCJcIn0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3ZWxjb21lQW5pbWF0aW9uICgpIHtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICB3ZWxjb21lLmFkZENsYXNzKCdzdGFydCcpO1xyXG4gIH0sIDEwMCk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgd2VsY29tZS5hZGRDbGFzcygnZW5kJyk7XHJcbiAgICB3ZWxjb21lLnRyaWdnZXIoJ2FuaW1lbmQnKTtcclxuICB9LCAyMDAwKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICB3ZWxjb21lLnRyaWdnZXIoJ2FuaW1kb25lJyk7XHJcbiAgfSwgMzAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG5cclxuICB3ZWxjb21lQW5pbWF0aW9uKCk7XHJcblxyXG4gIHdlbGNvbWUub24oJ2FuaW1lbmQnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnd2VsY29tZS1lbmQnKTtcclxuICB9KTtcclxuICB3ZWxjb21lLm9uKCdhbmltZG9uZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWxjb21lLWRvbmUnKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmZ1bGxwYWdlJykuZnVsbHBhZ2Uoe1xyXG4gICAgbmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgIG5hdmlnYXRpb25Qb3NpdGlvbjogJ2xlZnQnLFxyXG4gICAgb25MZWF2ZTogZnVuY3Rpb24gKG9yaWdpbiwgZGVzdGluYXRpb24sIGRpcmVjdGlvbikge1xyXG4gICAgICBpZiAoZGVzdGluYXRpb24gIT09IDEpIHtcclxuICAgICAgICBsZXQgbGFiZWwgPSAnbWF0ZXJpYWxfJyArIChkZXN0aW5hdGlvbiAtIDEpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcignc2VjdGlvbnNjcm9sbGVkJywgbGFiZWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiLCIvKipcclxuICog0JrQsNGA0YPRgdC10LvRjFxyXG4gKiBAbW9kdWxlIENhcm91c2VsXHJcbiAqL1xyXG5cclxubGV0IGNhcm91c2VsRGVmO1xyXG5cclxuLyoqXHJcbiAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBjYXJvdXNlbERlZiA9ICQoXCIub3dsLWNhcm91c2VsLmNhcm91c2VsLS1kZWZhdWx0XCIpO1xyXG5cclxuICBjYXJvdXNlbERlZi5vd2xDYXJvdXNlbCh7XHJcbiAgICBpdGVtczogMSxcclxuICAgIG1hcmdpbjogMCxcclxuICAgIG5hdjogZmFsc2UsXHJcbiAgICBuYXZUZXh0OiBbJycsICcnXSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICBsYXp5TG9hZDogdHJ1ZSxcclxuICAgIGxhenlMb2FkRWFnZXI6IDEsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJmdW5jdGlvbiBnZXRJY29uKGVsKSB7XHJcbiAgbGV0IGljb24gPSAnJztcclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3Zrb250YWt0ZScpKSB7XHJcbiAgICBpY29uID0gJ3ZrJztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV9mYWNlYm9vaycpKSB7XHJcbiAgICBpY29uID0gJ2ZiJztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV90d2l0dGVyJykpIHtcclxuICAgIGljb24gPSAndHcnO1xyXG4gIH1cclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3RlbGVncmFtJykpIHtcclxuICAgIGljb24gPSAndGcnO1xyXG4gIH1cclxuICByZXR1cm4gJzxzdmcgY2xhc3M9XCJpY29uIHNvY2lhbC1pY29uXCI+PHVzZSB4bGluazpocmVmPVwiIycgKyBpY29uICsgJ1wiLz48L3N2Zz4nO1xyXG59XHJcbmZ1bmN0aW9uIGZpbGxJY29ucygpIHtcclxuICAkKCcjc2hhcmUgLnlhLXNoYXJlMl9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuZmluZCgnLnlhLXNoYXJlMl9faWNvbicpLmh0bWwoZ2V0SWNvbigkKHRoaXMpKSk7XHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBZYS5zaGFyZTIoJ3NoYXJlJywge1xyXG4gICAgY29udGVudDoge1xyXG4gICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxyXG4gICAgICB0aXRsZTogJ9Ca0YDRg9GH0LUg0LjRhSDQvNGD0LfRi9C60Lgg0YLQvtC70YzQutC+INC40YUg0LjRgdGC0L7RgNC40Y8nLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCLQkiDQvtC20LjQtNCw0L3QuNC4INGE0LjQu9GM0LzQsCDCq9CR0L7Qs9C10LzRgdC60LDRjyDRgNCw0L/RgdC+0LTQuNGPwrsg0L/RgNC+INCk0YDQtdC00LTQuCDQnNC10YDQutGM0Y7RgNC4INC4INCz0YDRg9C/0L/RiyBRdWVlbiDCq9Cb0LXQvdGC0LAu0YDRg8K7INGA0LDRgdGB0LrQsNC30YvQstCw0LXRgiDQviDRgdCw0LzRi9GFINC40L3RgtC10YDQtdGB0L3Ri9GFINC4INC90LXQvtC20LjQtNCw0L3QvdGL0YUg0YTQsNC60YLQsNGFINC40Lcg0LbQuNC30L3QuCDQstC10LvQuNC60L7Qs9C+INC80YPQt9GL0LrQsNC90YLQsFwiLFxyXG4gICAgICBpbWFnZTogJ2h0dHA6Ly9ib2hlbWlhbnJoYXBzb2R5LmxlbnRhLnJ1L3NvY2lhbC5qcGcnXHJcbiAgICB9LFxyXG4gICAgdGhlbWU6IHtcclxuICAgICAgc2VydmljZXM6ICd2a29udGFrdGUsZmFjZWJvb2ssdHdpdHRlcix0ZWxlZ3JhbScsXHJcbiAgICAgIGJhcmU6IHRydWUsXHJcbiAgICAgIGxhbmc6ICdydSdcclxuICAgIH0sXHJcbiAgICBob29rczoge1xyXG4gICAgICBvbnJlYWR5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBmaWxsSWNvbnMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9zaGFyZS5qcyIsIi8qKlxyXG4gKiBZb3V0dWJlXHJcbiAqIEBtb2R1bGUgWW91dHViZVxyXG4gKi9cclxuXHJcbi8vIEluaXQgZW1wdHkgYXJyYXkgb2YgaWZyYW1lIElEcywgb25lIGZyb20gZWFjaCB2aWRlb1xyXG5sZXQgaWZyYW1lSWRzID0gW107XHJcblxyXG4vLyBJbml0IGVtcHR5IGFycmF5IG9mIGlmcmFtZSBZVCBvYmplY3RzIGZvciB1c2UgZWxzZXdoZXJlXHJcbi8vIEhlcmUgSSBvbmx5IHVzZSB0aGlzIHRvIGl0ZXJhdGUgdGhyb3VnaCBhbmQgcGF1c2UgYWxsIHZpZGVvcyB3aGVuXHJcbi8vIGFub3RoZXIgYmVnaW5zIHBsYXlpbmdcclxubGV0IGlmcmFtZU9iamVjdHMgPSBbXTtcclxuXHJcblxyXG4vLyBTaGFyZWQgb25SZWFkeSBldmVudCB3aGljaCBhZGRzIGV2ZW50cyB0byBlYWNoIHZpZGVvJ3MgY29ycmVzcG9uZGluZ1xyXG4vLyBwbGF5IGFuZCBzdG9wIGJ1dHRvbnNcclxuZnVuY3Rpb24gb25QbGF5ZXJSZWFkeShldmVudCkge1xyXG4gIGxldCBpZnJhbWVPYmplY3QgPSBldmVudC50YXJnZXQ7XHJcbiAgbGV0IGlmcmFtZUVsZW1lbnQgPSBpZnJhbWVPYmplY3QuYTtcclxuICBsZXQgdmlkZW9Db250YWluZXIgPSAkKGlmcmFtZUVsZW1lbnQpLmNsb3Nlc3QoJy55dCcpO1xyXG4gIGxldCBtb2RhbCA9IHZpZGVvQ29udGFpbmVyLmNsb3Nlc3QoJy5tb2RhbCcpO1xyXG4gIGxldCBwbGF5ID0gdmlkZW9Db250YWluZXIuZmluZChcIi5wbGF5XCIpO1xyXG4gIGxldCBzdG9wID0gdmlkZW9Db250YWluZXIuZmluZChcIi5zdG9wXCIpO1xyXG4gIFxyXG4gIC8vIFB1c2ggY3VycmVudCBpZnJhbWUgb2JqZWN0IHRvIGFycmF5XHJcbiAgaWZyYW1lT2JqZWN0cy5wdXNoKGlmcmFtZU9iamVjdCk7XHJcblxyXG4gIHBsYXkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIFBhdXNlIGFsbCB2aWRlb3MgY3VycmVudGx5IHBsYXlpbmdcclxuICAgIGlmcmFtZU9iamVjdHMuZm9yRWFjaChmdW5jdGlvbihzY29wZWRpZnJhbWVPYmplY3QpIHtcclxuICAgICAgc2NvcGVkaWZyYW1lT2JqZWN0LnBhdXNlVmlkZW8oKTtcclxuICAgICAgbGV0IHNjb3BlZGlmcmFtZUVsZW1lbnQgPSBzY29wZWRpZnJhbWVPYmplY3QuYTtcclxuICAgICAgc2NvcGVkaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpc1BsYXlpbmcnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBQbGF5IHNlbGVjdGVkIHZpZGVvXHJcbiAgICBpZnJhbWVPYmplY3QucGxheVZpZGVvKCk7XHJcbiAgICBpZnJhbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzUGxheWluZycpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIHN0b3Aub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgIGlmcmFtZU9iamVjdC5wYXVzZVZpZGVvKCk7XHJcbiAgICBpZnJhbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzUGxheWluZycpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIG1vZGFsLm9uKCdtb2RhbGNsb3NlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmcmFtZU9iamVjdC5wYXVzZVZpZGVvKCk7XHJcbiAgICBpZnJhbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzUGxheWluZycpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Lkg0LrQu9Cw0YHRgdC+0LJcclxuICogQGV4YW1wbGVcclxuICogWW91dHViZS5pbml0KCk7XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuICBNYWluLkhlbHBlcnMuYWRkU2NyaXB0KFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiKTtcclxuXHJcblxyXG4gIC8vIEZvciBlYWNoIGlmcmFtZSB5b3UgZmluZCwgYWRkIGl0cyBJRCB0byB0aGUgaWZyYW1lSWRzIGFycmF5XHJcbiAgbGV0IGlmcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnl0IGlmcmFtZVwiKTtcclxuICBpZnJhbWVzLmZvckVhY2goZnVuY3Rpb24oaWZyYW1lKSB7XHJcbiAgICBpZnJhbWVJZHMucHVzaChpZnJhbWUuaWQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBPbmNlIHRoZSBZb3VUdWJlIEFQSSBpcyByZWFkeSwgZm9yIGVhY2ggaWZyYW1lSWQgaW4geW91ciBhcnJheSwgY3JlYXRlXHJcbiAgLy8gYSBuZXcgWVQgcGxheWVyIGFuZCBnaXZlIGl0IHRoZSBvblJlYWR5IGV2ZW50XHJcbiAgd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWZyYW1lSWRzLmZvckVhY2goZnVuY3Rpb24oaWZyYW1lSWQpIHtcclxuICAgICAgdmFyIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoaWZyYW1lSWQsIHtcclxuICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgIG9uUmVhZHk6IG9uUGxheWVyUmVhZHlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMveW91dHViZS5qcyIsIi8qKlxyXG4gKiBTdGF0aXN0aWNcclxuICogQG1vZHVsZSBTdGF0aXN0aWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBzZW5kR2EoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwpIHtcclxuICBnYSgnc2VuZCcsIHtcclxuICAgICAgaGl0VHlwZTogJ2V2ZW50JyxcclxuICAgICAgZXZlbnRDYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgIGV2ZW50QWN0aW9uOiBhY3Rpb24sXHJcbiAgICAgIGV2ZW50TGFiZWw6IGxhYmVsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICQoJy5idG4tdGlja2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzZW5kR2EoJ2V4dGVybmFsJywgJ2NsaWNrJywgJ2J1eV90aWNrZXQnKTtcclxuICB9KTtcclxuICAkKCcubGluay1sZW50YScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBzZW5kR2EoJ2V4dGVybmFsJywgJ2NsaWNrJywgJ2xlbnRhX2xvZ28nKTtcclxuICB9KTtcclxuXHJcbiAgJCgnI3RyYWlsZXInKS5vbignbW9kYWxvcGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICBzZW5kR2EoJ2ludGVybmFsJywgJ2NsaWNrJywgJ3dhdGNoX3RyYWlsZXInKTtcclxuICB9KTtcclxuICAkKCcjdHJhaWxlcicpLm9uKCdtb2RhbGNsb3NlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2VuZEdhKCdpbnRlcm5hbCcsICdjbGljaycsICdjbG9zZV90cmFpbGVyJyk7XHJcbiAgfSk7XHJcbiAgJCgnLmJ0bi1tYXRlcmlhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2VuZEdhKCdpbnRlcm5hbCcsICdjbGljaycsICQodGhpcykuY2xvc2VzdCgnLnNjcmVlbicpLmRhdGEoJ21hdGVyaWFsJykpO1xyXG4gIH0pO1xyXG4gICQoJy5mcC1zZWN0aW9uJykub24oJ3NlY3Rpb25zY3JvbGxlZCcsIGZ1bmN0aW9uKGUsIGxhYmVsKSB7XHJcbiAgICBzZW5kR2EoJ2ludGVybmFsJywgJ3Njcm9sbCcsIGxhYmVsKTtcclxuICB9KVxyXG5cclxuICBpZigkKCcubGF5b3V0JykuaGFzQ2xhc3MoJ2xheW91dC0tbGVudGEnKSkge1xyXG4gICAgalF1ZXJ5LnNjcm9sbERlcHRoKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQsIHNlbmRHYSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9zdGF0aXN0aWMuanMiLCIvKipcclxuICog0JzQvtC00YPQu9GMINC00LvRjyDRgNCw0LHQvtGC0YsgcGxhY2Vob2xkZXIg0LIg0Y3Qu9C10LzQtdC90YLQsNGFINGE0L7RgNC80YsgKC5maWVsZClcclxuICogQG1vZHVsZSBJbnB1dFxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICog0KPRgdGC0LDQvdC+0LLQuNGC0Ywg0YTQvtC60YPRgVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGZvY3VzTGFiZWwoaW5wdXQpe1xyXG4gICAgaW5wdXQuY2xvc2VzdCgnLmZpZWxkJykuYWRkQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQo9Cx0YDQsNGC0Ywg0YTQvtC60YPRgVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGJsdXJMYWJlbChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgd3JhcHBlci5yZW1vdmVDbGFzcyhcImhhcy1mb2N1c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCf0YDQvtCy0LXRgNC40YLRjCDQuNC90L/Rg9GCINC90LAg0L3QsNC70LjRh9C40LUgdmFsdWVcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBjaGVja0lucHV0KGlucHV0KXtcclxuICAgIHZhciB3cmFwcGVyID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICBpZiAoaW5wdXQudmFsKCkubGVuZ3RoID4gMClcclxuICAgICAgICB3cmFwcGVyLmFkZENsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtdmFsdWVcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LjQvdC/0YPRgtCwXHJcbiAqIEBleGFtcGxlXHJcbiAqIElucHV0LmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIGxldCBpbnB1dHMgPSAkKCcuZmllbGRfX2lucHV0Jyk7XHJcbiAgICBsZXQgcGxhY2Vob2xkZXJzID0gJCgnLmZpZWxkX19wbGFjZWhvbGRlcicpO1xyXG4gICAgbGV0IGZsb3cgPSAkKCcuZmxvdy10ZXh0YXJlYScpO1xyXG4gICAgXHJcbiAgICBwbGFjZWhvbGRlcnMuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZmllbGQnKS5maW5kKCcuZmllbGRfX2lucHV0JykuZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKGksIGl0ZW0pIHtcclxuICAgICAgICBjaGVja0lucHV0KCQoaXRlbSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmZvY3VzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9jdXNMYWJlbCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5ibHVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYmx1ckxhYmVsKCQodGhpcykpO1xyXG4gICAgICAgIGNoZWNrSW5wdXQoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmbG93Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZmxvdy5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKHNlbGYpe1xyXG4gICAgICAgICAgICBsZXQgZmxvd0V4ID0gJChzZWxmKS5zaWJsaW5ncygnLmZsb3ctdGV4dGFyZWEtZXhhbXBsZScpO1xyXG4gICAgICAgICAgICBmbG93RXguaHRtbCgkKHNlbGYpLnZhbCgpLnJlcGxhY2UoL1xccj9cXG4vZywnPGJyLz4nKSk7XHJcbiAgICAgICAgICAgIGlmIChmbG93Lm91dGVySGVpZ2h0KCkgIT09IGZsb3dFeC5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICBmbG93LnN0b3AoKS5hbmltYXRlKHsnaGVpZ2h0JzogZmxvd0V4Lm91dGVySGVpZ2h0KCl9LCAzMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAsIHRoaXMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9mb3Jtcy5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBOzs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7Ozs7Ozs7O0FDeENBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7Ozs7O0FDeFFBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTs7Ozs7Ozs7O0FDOUNBOzs7OztBQUtBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWEE7QUFjQTtBQUNBOzs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBWkE7QUFrQkE7Ozs7Ozs7OztBQ3hDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaEZBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3hDQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9