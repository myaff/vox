/**
 * Helpers
 * @module Helpers
 */

// Add script asynh
function addScript (url) {
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
function getNativeScrollbarWidth (container) {
  container = container || document.body;

  let fullWidth = 0;
  let barWidth = 0;

  let wrapper = document.createElement('div');
  let child = document.createElement('div');

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
function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  let last,
    deferTimer;
  return function () {
    let context = scope || this;

    let now = +new Date(),
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
  }
}

/** 
 * Debounce Helper
 * https://remysharp.com/2010/07/21/throttling-function-calls
 */
function debounce (fn, delay) {
  let timer = null;
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

let timer;
let timeout = false;
let delta = 200;
function resizeEnd() {
  if (new Date() - timer < delta) {
    setTimeout(resizeEnd, delta);
  } else {
    timeout = false;
    $(window).trigger('resizeend');
  }
}

function toggleClassIf(el, cond, toggledClass){
	if(cond){
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
function toggleElementClassOnScroll(el, scrollValue = 0, toggledClass = 'scrolled'){
	if(el.length == 0) {
		//console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
		return false;
	}
	
	if(scrollValue == 'this') {
		scrollValue = el.offset().top - $(window).outerHeight() / 2;
	}
	
	$(window).on('scroll', function(e){
		if($(window).scrollTop() > scrollValue){
			el.addClass(toggledClass);
		} else {
			el.removeClass(toggledClass);
		}
	});
};

/* Modals */
function openModal(modal) {
  if (modal) {
    let win = modal.find('.modal__window');
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
    let win = modal.find('.modal__window');
    win.fadeOut(500);
    modal.fadeOut(500);
    $('html, body').css('overflow-y', '');
    modal.trigger('modalclosed')
  } else {
    console.error('Which modal?');
  }
}

function setScrollpad(els) {
  if ($('.layout').outerHeight() > window.outerHeight) {
    els.css({'padding-right': getNativeScrollbarWidth() + 'px'});
  } else {
    els.css({'padding-right': '0px'});
  }
}


/**
 * инициализация событий для переключателей классов
 * @example
 * Helpers.init();
 */
function init(){
  
  toggleElementClassOnScroll($('.header'), 50);
  
  $('.js-hide-block').on('click', function(){
    let target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
    target.fadeOut(500);
  });

  $('.btn-close-modal').on('click', function(){
    let target = !!$(this).data('target') ? $($(this).data('target')) : $(this).parent();
    let modal = target.parent('.modal');
    closeModal(modal)
  });

  $('.modal').on('click', function() {
    closeModal($(this));
  });

  $('.btn-modal').on('click', function(e) {
    let target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
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

    $(window).on('resizeend', function(){
      setScrollpad($('.layout, .page-animate'));
    });
  }
  
  $('.btn-open-aside').on('click', function(e){
    e.preventDefault();
    $('.aside').addClass('is-open');
    $('body').addClass('aside-is-open');
    if ($('.layout').outerHeight() > window.outerHeight) {
      $('.header, .sidebar').css({'right': getNativeScrollbarWidth() + 'px'});
      $('html, body').css('overflow-y', 'hidden');
    }
  });
  $('.btn-close-aside').on('click', function(e){
    e.preventDefault();
    $('.aside').removeClass('is-open');
    $('body').removeClass('aside-is-open');
    if ($('.layout').outerHeight() > window.outerHeight) {
      $('.header, .sidebar').css({'right': '0px'});
      $('html, body').css('overflow-y', '');
    }
  });

  $('.btn-accordion').on('click', function() {
    let accordion = $($(this).data('target'));
    $(this).toggleClass('is-open');
    accordion.toggleClass('is-open').slideToggle(500);
  });
  
  $(window).scroll($.debounce(250, true, function() {
    $('html').addClass('is-scrolling');
  }));
  $(window).scroll($.debounce(250, function() {
    $('html').removeClass('is-scrolling');
  }));
  
}

module.exports = {
  init, 
  getNativeScrollbarWidth,
  toggleClassIf, 
  toggleElementClassOnScroll, 
  addScript, 
  openModal, 
  closeModal
};