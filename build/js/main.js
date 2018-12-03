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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNjU3YjEzZmNhMWU4MmJiMDZlZiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy95b3V0dWJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9zdGF0aXN0aWMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2Zvcm1zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjNjU3YjEzZmNhMWU4MmJiMDZlZiIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hbmltYXRpb25cIik7XHJcbmxldCBDYXJvdXNlbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2Fyb3VzZWxcIik7XHJcbmxldCBTaGFyZSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2hhcmVcIik7XHJcbmxldCBZb3V0dWJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy95b3V0dWJlXCIpO1xyXG5sZXQgU3RhdGlzdGljID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdGF0aXN0aWNcIik7XHJcbmxldCBGb3JtcyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybXNcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBTaGFyZS5pbml0KCk7XHJcbiAgQ2Fyb3VzZWwuaW5pdCgpO1xyXG4gIFxyXG4gICQuYWZ0ZXJsYWcoZnVuY3Rpb24oKXtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICBcclxuICAvL0FuaW1hdGlvbi5pbml0KCk7XHJcbiAgRm9ybXMuaW5pdCgpO1xyXG5cclxuICAvKlxyXG4gIGlmICgod2luZG93LmlubmVyV2lkdGggPiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSB8fCAhJCgnaHRtbCcpLmhhc0NsYXNzKCdmcC1lbmFibGVkJykpIHtcclxuICAgICQoJy5sYXlvdXQsIC5oZWFkZXInKS5jc3MoeydwYWRkaW5nLXJpZ2h0JzogSGVscGVycy5nZXROYXRpdmVTY3JvbGxiYXJXaWR0aCgpICsgJ3B4J30pO1xyXG4gIH1cclxuICAqL1xyXG5cclxuICBZb3V0dWJlLmluaXQoKTtcclxuICBTdGF0aXN0aWMuaW5pdCgpO1xyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuXHRDYXJvdXNlbCxcclxuICBTaGFyZSxcclxuICBBbmltYXRpb24sXHJcbiAgWW91dHViZSxcclxuICBTdGF0aXN0aWMsXHJcbiAgRm9ybXNcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL21haW4uanMiLCJsZXQgYnJlYWtwb2ludHMgPSB7XHJcbiAgc206IDc2NyxcclxuICBtZDogMTAyNCxcclxuICBsZzogMTI4MCxcclxuICB4bDogMTYwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNQb3J0cmFpdCgpIHtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDwgJCh3aW5kb3cpLmhlaWdodCgpKTtcclxufVxyXG5mdW5jdGlvbiBpc0xhbmRzY2FwZSgpIHtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKTtcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzRGVza3RvcEV4dCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNEZXNrdG9wKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZVZlcnNpb24oKXtcclxuICByZXR1cm4gISF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcIi9tb2JpbGUvXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBydW4oKXtcclxuICBpZihpc1RvdWNoKCkpe1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby10b3VjaCcpLmFkZENsYXNzKCd0b3VjaCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3RvdWNoJykuYWRkQ2xhc3MoJ25vLXRvdWNoJyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBydW4sXHJcbiAgaXNUb3VjaCxcclxuICBpc01vYmlsZSxcclxuICBpc1RhYmxldCxcclxuICBpc0Rlc2t0b3AsXHJcbiAgaXNEZXNrdG9wRXh0LFxyXG4gIGlzTW9iaWxlVmVyc2lvbixcclxuICBpc1BvcnRyYWl0LFxyXG4gIGlzTGFuZHNjYXBlXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCIvKipcclxuICogSGVscGVyc1xyXG4gKiBAbW9kdWxlIEhlbHBlcnNcclxuICovXHJcblxyXG4vLyBBZGQgc2NyaXB0IGFzeW5oXHJcbmZ1bmN0aW9uIGFkZFNjcmlwdCAodXJsKSB7XHJcbiAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgdGFnLnNyYyA9IHVybDtcclxuICB2YXIgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtcclxuICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRocm90dGxlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XHJcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XHJcbiAgbGV0IGxhc3QsXHJcbiAgICBkZWZlclRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XHJcblxyXG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcclxuICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XHJcbiAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9LCB0aHJlc2hob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIFxyXG4gKiBEZWJvdW5jZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gIGxldCB0aW1lciA9IG51bGw7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59O1xyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyogTW9kYWxzICovXHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbCkge1xyXG4gIGlmIChtb2RhbCkge1xyXG4gICAgbGV0IHdpbiA9IG1vZGFsLmZpbmQoJy5tb2RhbF9fd2luZG93Jyk7XHJcbiAgICBtb2RhbC5mYWRlSW4oNTAwKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB3aW4uZmFkZUluKDUwMCk7XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbG9wZW5lZCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdXaGljaCBtb2RhbD8nKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWwpIHtcclxuICBpZiAobW9kYWwpIHtcclxuICAgIGxldCB3aW4gPSBtb2RhbC5maW5kKCcubW9kYWxfX3dpbmRvdycpO1xyXG4gICAgd2luLmZhZGVPdXQoNTAwKTtcclxuICAgIG1vZGFsLmZhZGVPdXQoNTAwKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICBtb2RhbC50cmlnZ2VyKCdtb2RhbGNsb3NlZCcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1doaWNoIG1vZGFsPycpO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBIZWxwZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksIDUwKTtcclxuICBcclxuICAkKCcuanMtaGlkZS1ibG9jaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA9PT0gJ3NlbGYnID8gJCh0aGlzKS5wYXJlbnQoKSA6ICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgICB0YXJnZXQuZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLWNsb3NlLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCB0YXJnZXQgPSAhISQodGhpcykuZGF0YSgndGFyZ2V0JykgPyAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpIDogJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgIGxldCBtb2RhbCA9IHRhcmdldC5wYXJlbnQoJy5tb2RhbCcpO1xyXG4gICAgY2xvc2VNb2RhbChtb2RhbClcclxuICB9KTtcclxuXHJcbiAgJCgnLm1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjbG9zZU1vZGFsKCQodGhpcykpO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuYnRuLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3Blbk1vZGFsKHRhcmdldCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aW1lciA9IG5ldyBEYXRlKCk7XHJcbiAgICBpZiAodGltZW91dCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGltZW91dCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cclxuICBpZiAoJCgnLmxheW91dCcpLmhhc0NsYXNzKCdsYXlvdXQtLWhvbWUnKSAmJiBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpKSB7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3JvdGF0ZScpO1xyXG4gICAgICAkKCcucGFnZS1yb3RhdGUnKS5mYWRlSW4oNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZWVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ3JvdGF0ZScpO1xyXG4gICAgICAgICQoJy5wYWdlLXJvdGF0ZScpLmZhZGVJbig1MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5wYWdlLXJvdGF0ZScpLmZhZGVPdXQoNTAwKTtcclxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3JvdGF0ZScpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAkKCcubGF5b3V0JykuY3NzKHsncGFkZGluZy1yaWdodCc6IGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnfSk7XHJcbiAgfVxyXG4gIFxyXG4gICQoJy5idG4tb3Blbi1hc2lkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnLmFzaWRlJykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYXNpZGUtaXMtb3BlbicpO1xyXG4gICAgaWYgKCQoJy5sYXlvdXQnKS5vdXRlckhlaWdodCgpID4gd2luZG93Lm91dGVySGVpZ2h0KSB7XHJcbiAgICAgICQoJy5oZWFkZXIsIC5zaWRlYmFyJykuY3NzKHsncmlnaHQnOiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCgpICsgJ3B4J30pO1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gICQoJy5idG4tY2xvc2UtYXNpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJy5hc2lkZScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2FzaWRlLWlzLW9wZW4nKTtcclxuICAgIGlmICgkKCcubGF5b3V0Jykub3V0ZXJIZWlnaHQoKSA+IHdpbmRvdy5vdXRlckhlaWdodCkge1xyXG4gICAgICAkKCcuaGVhZGVyLCAuc2lkZWJhcicpLmNzcyh7J3JpZ2h0JzogJzBweCd9KTtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJCgnLmJ0bi1hY2NvcmRpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBhY2NvcmRpb24gPSAkKCQodGhpcykuZGF0YSgndGFyZ2V0JykpO1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgYWNjb3JkaW9uLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJykuc2xpZGVUb2dnbGUoNTAwKTtcclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCB0cnVlLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGluaXQsIFxyXG4gIGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoLFxyXG4gIHRvZ2dsZUNsYXNzSWYsIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsLCBcclxuICBhZGRTY3JpcHQsIFxyXG4gIG9wZW5Nb2RhbCwgXHJcbiAgY2xvc2VNb2RhbFxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9oZWxwZXJzLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgQW5pbWF0aW9uXHJcbiAqL1xyXG5cclxubGV0IHdlbGNvbWUgPSAkKCcuanMtd2VsY29tZScpO1xyXG5cclxuZnVuY3Rpb24gY2xlYXJTdHlsZSAoZWwpIHtcclxuICAkKGVsKS5jc3Moe1widHJhbnNmb3JtXCI6IFwiXCJ9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gd2VsY29tZUFuaW1hdGlvbiAoKSB7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgd2VsY29tZS5hZGRDbGFzcygnc3RhcnQnKTtcclxuICB9LCAxMDApO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIHdlbGNvbWUuYWRkQ2xhc3MoJ2VuZCcpO1xyXG4gICAgd2VsY29tZS50cmlnZ2VyKCdhbmltZW5kJyk7XHJcbiAgfSwgMjAwMCk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgd2VsY29tZS50cmlnZ2VyKCdhbmltZG9uZScpO1xyXG4gIH0sIDMwMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0ICgpIHtcclxuXHJcbiAgd2VsY29tZUFuaW1hdGlvbigpO1xyXG5cclxuICB3ZWxjb21lLm9uKCdhbmltZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlbGNvbWUtZW5kJyk7XHJcbiAgfSk7XHJcbiAgd2VsY29tZS5vbignYW5pbWRvbmUnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnd2VsY29tZS1kb25lJyk7XHJcbiAgfSk7XHJcblxyXG4gICQoJy5mdWxscGFnZScpLmZ1bGxwYWdlKHtcclxuICAgIG5hdmlnYXRpb246IHRydWUsXHJcbiAgICBuYXZpZ2F0aW9uUG9zaXRpb246ICdsZWZ0JyxcclxuICAgIG9uTGVhdmU6IGZ1bmN0aW9uIChvcmlnaW4sIGRlc3RpbmF0aW9uLCBkaXJlY3Rpb24pIHtcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uICE9PSAxKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gJ21hdGVyaWFsXycgKyAoZGVzdGluYXRpb24gLSAxKTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3NlY3Rpb25zY3JvbGxlZCcsIGxhYmVsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIiwiLyoqXHJcbiAqINCa0LDRgNGD0YHQtdC70YxcclxuICogQG1vZHVsZSBDYXJvdXNlbFxyXG4gKi9cclxuXHJcbmxldCBjYXJvdXNlbERlZjtcclxuXHJcbi8qKlxyXG4gKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQutCw0YDRg9GB0LXQu9C4XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgY2Fyb3VzZWxEZWYgPSAkKFwiLm93bC1jYXJvdXNlbC5jYXJvdXNlbC0tZGVmYXVsdFwiKTtcclxuXHJcbiAgY2Fyb3VzZWxEZWYub3dsQ2Fyb3VzZWwoe1xyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBtYXJnaW46IDAsXHJcbiAgICBuYXY6IGZhbHNlLFxyXG4gICAgbmF2VGV4dDogWycnLCAnJ10sXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgbGF6eUxvYWQ6IHRydWUsXHJcbiAgICBsYXp5TG9hZEVhZ2VyOiAxLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gIH0pO1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Nhcm91c2VsLmpzIiwiZnVuY3Rpb24gZ2V0SWNvbihlbCkge1xyXG4gIGxldCBpY29uID0gJyc7XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV92a29udGFrdGUnKSkge1xyXG4gICAgaWNvbiA9ICd2ayc7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfZmFjZWJvb2snKSkge1xyXG4gICAgaWNvbiA9ICdmYic7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdHdpdHRlcicpKSB7XHJcbiAgICBpY29uID0gJ3R3JztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV90ZWxlZ3JhbScpKSB7XHJcbiAgICBpY29uID0gJ3RnJztcclxuICB9XHJcbiAgcmV0dXJuICc8c3ZnIGNsYXNzPVwiaWNvbiBzb2NpYWwtaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiMnICsgaWNvbiArICdcIi8+PC9zdmc+JztcclxufVxyXG5mdW5jdGlvbiBmaWxsSWNvbnMoKSB7XHJcbiAgJCgnI3NoYXJlIC55YS1zaGFyZTJfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy55YS1zaGFyZTJfX2ljb24nKS5odG1sKGdldEljb24oJCh0aGlzKSkpO1xyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgWWEuc2hhcmUyKCdzaGFyZScsIHtcclxuICAgIGNvbnRlbnQ6IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcclxuICAgICAgdGl0bGU6ICfQmtGA0YPRh9C1INC40YUg0LzRg9C30YvQutC4INGC0L7Qu9GM0LrQviDQuNGFINC40YHRgtC+0YDQuNGPJyxcclxuICAgICAgZGVzY3JpcHRpb246IFwi0JIg0L7QttC40LTQsNC90LjQuCDRhNC40LvRjNC80LAgwqvQkdC+0LPQtdC80YHQutCw0Y8g0YDQsNC/0YHQvtC00LjRj8K7INC/0YDQviDQpNGA0LXQtNC00Lgg0JzQtdGA0LrRjNGO0YDQuCDQuCDQs9GA0YPQv9C/0YsgUXVlZW4gwqvQm9C10L3RgtCwLtGA0YPCuyDRgNCw0YHRgdC60LDQt9GL0LLQsNC10YIg0L4g0YHQsNC80YvRhSDQuNC90YLQtdGA0LXRgdC90YvRhSDQuCDQvdC10L7QttC40LTQsNC90L3Ri9GFINGE0LDQutGC0LDRhSDQuNC3INC20LjQt9C90Lgg0LLQtdC70LjQutC+0LPQviDQvNGD0LfRi9C60LDQvdGC0LBcIixcclxuICAgICAgaW1hZ2U6ICdodHRwOi8vYm9oZW1pYW5yaGFwc29keS5sZW50YS5ydS9zb2NpYWwuanBnJ1xyXG4gICAgfSxcclxuICAgIHRoZW1lOiB7XHJcbiAgICAgIHNlcnZpY2VzOiAndmtvbnRha3RlLGZhY2Vib29rLHR3aXR0ZXIsdGVsZWdyYW0nLFxyXG4gICAgICBiYXJlOiB0cnVlLFxyXG4gICAgICBsYW5nOiAncnUnXHJcbiAgICB9LFxyXG4gICAgaG9va3M6IHtcclxuICAgICAgb25yZWFkeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZmlsbEljb25zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvc2hhcmUuanMiLCIvKipcclxuICogWW91dHViZVxyXG4gKiBAbW9kdWxlIFlvdXR1YmVcclxuICovXHJcblxyXG4vLyBJbml0IGVtcHR5IGFycmF5IG9mIGlmcmFtZSBJRHMsIG9uZSBmcm9tIGVhY2ggdmlkZW9cclxubGV0IGlmcmFtZUlkcyA9IFtdO1xyXG5cclxuLy8gSW5pdCBlbXB0eSBhcnJheSBvZiBpZnJhbWUgWVQgb2JqZWN0cyBmb3IgdXNlIGVsc2V3aGVyZVxyXG4vLyBIZXJlIEkgb25seSB1c2UgdGhpcyB0byBpdGVyYXRlIHRocm91Z2ggYW5kIHBhdXNlIGFsbCB2aWRlb3Mgd2hlblxyXG4vLyBhbm90aGVyIGJlZ2lucyBwbGF5aW5nXHJcbmxldCBpZnJhbWVPYmplY3RzID0gW107XHJcblxyXG5cclxuLy8gU2hhcmVkIG9uUmVhZHkgZXZlbnQgd2hpY2ggYWRkcyBldmVudHMgdG8gZWFjaCB2aWRlbydzIGNvcnJlc3BvbmRpbmdcclxuLy8gcGxheSBhbmQgc3RvcCBidXR0b25zXHJcbmZ1bmN0aW9uIG9uUGxheWVyUmVhZHkoZXZlbnQpIHtcclxuICBsZXQgaWZyYW1lT2JqZWN0ID0gZXZlbnQudGFyZ2V0O1xyXG4gIGxldCBpZnJhbWVFbGVtZW50ID0gaWZyYW1lT2JqZWN0LmE7XHJcbiAgbGV0IHZpZGVvQ29udGFpbmVyID0gJChpZnJhbWVFbGVtZW50KS5jbG9zZXN0KCcueXQnKTtcclxuICBsZXQgbW9kYWwgPSB2aWRlb0NvbnRhaW5lci5jbG9zZXN0KCcubW9kYWwnKTtcclxuICBsZXQgcGxheSA9IHZpZGVvQ29udGFpbmVyLmZpbmQoXCIucGxheVwiKTtcclxuICBsZXQgc3RvcCA9IHZpZGVvQ29udGFpbmVyLmZpbmQoXCIuc3RvcFwiKTtcclxuICBcclxuICAvLyBQdXNoIGN1cnJlbnQgaWZyYW1lIG9iamVjdCB0byBhcnJheVxyXG4gIGlmcmFtZU9iamVjdHMucHVzaChpZnJhbWVPYmplY3QpO1xyXG5cclxuICBwbGF5Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBQYXVzZSBhbGwgdmlkZW9zIGN1cnJlbnRseSBwbGF5aW5nXHJcbiAgICBpZnJhbWVPYmplY3RzLmZvckVhY2goZnVuY3Rpb24oc2NvcGVkaWZyYW1lT2JqZWN0KSB7XHJcbiAgICAgIHNjb3BlZGlmcmFtZU9iamVjdC5wYXVzZVZpZGVvKCk7XHJcbiAgICAgIGxldCBzY29wZWRpZnJhbWVFbGVtZW50ID0gc2NvcGVkaWZyYW1lT2JqZWN0LmE7XHJcbiAgICAgIHNjb3BlZGlmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXNQbGF5aW5nJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gUGxheSBzZWxlY3RlZCB2aWRlb1xyXG4gICAgaWZyYW1lT2JqZWN0LnBsYXlWaWRlbygpO1xyXG4gICAgaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpc1BsYXlpbmcnKTtcclxuICB9KTtcclxuICBcclxuICBzdG9wLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBpZnJhbWVPYmplY3QucGF1c2VWaWRlbygpO1xyXG4gICAgaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpc1BsYXlpbmcnKTtcclxuICB9KTtcclxuICBcclxuICBtb2RhbC5vbignbW9kYWxjbG9zZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZnJhbWVPYmplY3QucGF1c2VWaWRlbygpO1xyXG4gICAgaWZyYW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpc1BsYXlpbmcnKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIFlvdXR1YmUuaW5pdCgpO1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcbiAgTWFpbi5IZWxwZXJzLmFkZFNjcmlwdChcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIik7XHJcblxyXG5cclxuICAvLyBGb3IgZWFjaCBpZnJhbWUgeW91IGZpbmQsIGFkZCBpdHMgSUQgdG8gdGhlIGlmcmFtZUlkcyBhcnJheVxyXG4gIGxldCBpZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55dCBpZnJhbWVcIik7XHJcbiAgaWZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGlmcmFtZSkge1xyXG4gICAgaWZyYW1lSWRzLnB1c2goaWZyYW1lLmlkKTtcclxuICB9KTtcclxuXHJcbiAgLy8gT25jZSB0aGUgWW91VHViZSBBUEkgaXMgcmVhZHksIGZvciBlYWNoIGlmcmFtZUlkIGluIHlvdXIgYXJyYXksIGNyZWF0ZVxyXG4gIC8vIGEgbmV3IFlUIHBsYXllciBhbmQgZ2l2ZSBpdCB0aGUgb25SZWFkeSBldmVudFxyXG4gIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmcmFtZUlkcy5mb3JFYWNoKGZ1bmN0aW9uKGlmcmFtZUlkKSB7XHJcbiAgICAgIHZhciBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGlmcmFtZUlkLCB7XHJcbiAgICAgICAgZXZlbnRzOiB7XHJcbiAgICAgICAgICBvblJlYWR5OiBvblBsYXllclJlYWR5XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3lvdXR1YmUuanMiLCIvKipcclxuICogU3RhdGlzdGljXHJcbiAqIEBtb2R1bGUgU3RhdGlzdGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gc2VuZEdhKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsKSB7XHJcbiAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgIGhpdFR5cGU6ICdldmVudCcsXHJcbiAgICAgIGV2ZW50Q2F0ZWdvcnk6IGNhdGVnb3J5LFxyXG4gICAgICBldmVudEFjdGlvbjogYWN0aW9uLFxyXG4gICAgICBldmVudExhYmVsOiBsYWJlbFxyXG4gIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAkKCcuYnRuLXRpY2tldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2VuZEdhKCdleHRlcm5hbCcsICdjbGljaycsICdidXlfdGlja2V0Jyk7XHJcbiAgfSk7XHJcbiAgJCgnLmxpbmstbGVudGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgc2VuZEdhKCdleHRlcm5hbCcsICdjbGljaycsICdsZW50YV9sb2dvJyk7XHJcbiAgfSk7XHJcblxyXG4gICQoJyN0cmFpbGVyJykub24oJ21vZGFsb3BlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgc2VuZEdhKCdpbnRlcm5hbCcsICdjbGljaycsICd3YXRjaF90cmFpbGVyJyk7XHJcbiAgfSk7XHJcbiAgJCgnI3RyYWlsZXInKS5vbignbW9kYWxjbG9zZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnY2xpY2snLCAnY2xvc2VfdHJhaWxlcicpO1xyXG4gIH0pO1xyXG4gICQoJy5idG4tbWF0ZXJpYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIHNlbmRHYSgnaW50ZXJuYWwnLCAnY2xpY2snLCAkKHRoaXMpLmNsb3Nlc3QoJy5zY3JlZW4nKS5kYXRhKCdtYXRlcmlhbCcpKTtcclxuICB9KTtcclxuICAkKCcuZnAtc2VjdGlvbicpLm9uKCdzZWN0aW9uc2Nyb2xsZWQnLCBmdW5jdGlvbihlLCBsYWJlbCkge1xyXG4gICAgc2VuZEdhKCdpbnRlcm5hbCcsICdzY3JvbGwnLCBsYWJlbCk7XHJcbiAgfSlcclxuXHJcbiAgaWYoJCgnLmxheW91dCcpLmhhc0NsYXNzKCdsYXlvdXQtLWxlbnRhJykpIHtcclxuICAgIGpRdWVyeS5zY3JvbGxEZXB0aCgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBpbml0LCBzZW5kR2EgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvc3RhdGlzdGljLmpzIiwiLyoqXHJcbiAqINCc0L7QtNGD0LvRjCDQtNC70Y8g0YDQsNCx0L7RgtGLIHBsYWNlaG9sZGVyINCyINGN0LvQtdC80LXQvdGC0LDRhSDRhNC+0YDQvNGLICguZmllbGQpXHJcbiAqIEBtb2R1bGUgSW5wdXRcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINCj0YHRgtCw0L3QvtCy0LjRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBmb2N1c0xhYmVsKGlucHV0KXtcclxuICAgIGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpLmFkZENsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0KPQsdGA0LDRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBibHVyTGFiZWwoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQn9GA0L7QstC10YDQuNGC0Ywg0LjQvdC/0YPRgiDQvdCwINC90LDQu9C40YfQuNC1IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgaWYgKGlucHV0LnZhbCgpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC40L3Qv9GD0YLQsFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBJbnB1dC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBsZXQgaW5wdXRzID0gJCgnLmZpZWxkX19pbnB1dCcpO1xyXG4gICAgbGV0IHBsYWNlaG9sZGVycyA9ICQoJy5maWVsZF9fcGxhY2Vob2xkZXInKTtcclxuICAgIGxldCBmbG93ID0gJCgnLmZsb3ctdGV4dGFyZWEnKTtcclxuICAgIFxyXG4gICAgcGxhY2Vob2xkZXJzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmZpZWxkJykuZmluZCgnLmZpZWxkX19pbnB1dCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKGl0ZW0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvY3VzTGFiZWwoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuYmx1cihmdW5jdGlvbigpe1xyXG4gICAgICAgIGJsdXJMYWJlbCgkKHRoaXMpKTtcclxuICAgICAgICBjaGVja0lucHV0KCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZmxvdy5vbigna2V5ZG93bicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZsb3cub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbihzZWxmKXtcclxuICAgICAgICAgICAgbGV0IGZsb3dFeCA9ICQoc2VsZikuc2libGluZ3MoJy5mbG93LXRleHRhcmVhLWV4YW1wbGUnKTtcclxuICAgICAgICAgICAgZmxvd0V4Lmh0bWwoJChzZWxmKS52YWwoKS5yZXBsYWNlKC9cXHI/XFxuL2csJzxici8+JykpO1xyXG4gICAgICAgICAgICBpZiAoZmxvdy5vdXRlckhlaWdodCgpICE9PSBmbG93RXgub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgZmxvdy5zdG9wKCkuYW5pbWF0ZSh7J2hlaWdodCc6IGZsb3dFeC5vdXRlckhlaWdodCgpfSwgMzAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwLCB0aGlzKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZm9ybXMuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBOzs7Ozs7OztBQ3hDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7Ozs7Ozs7QUNqUUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBOzs7Ozs7Ozs7QUM5Q0E7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQWNBO0FBQ0E7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFaQTtBQWtCQTs7Ozs7Ozs7O0FDeENBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNoRkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDeENBOzs7OztBQU1BOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=