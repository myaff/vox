/**
 * Переключение классов по различным событиям
 * @module Animation
 */

let state = {
  loaded: false,
  anim: false
};
let debug = true;
let delay = 1000;

function setSize() {
  $('.page-animate__item').each(function(index) {
    $(this).css({'height': $('.project').eq(index).find('.project__img').outerHeight()});
  });
  if (Main.DeviceDetection.isMobile()) {
    $('.page-animate__item').each(function(index) {
      $(this).css({'margin-bottom': $('.project').eq(index).find('.project__info').outerHeight()});
    });
  }
}

function init () {

  setSize();
  $(window).on('resizeend', function(){
    setSize();
  });

  $('.anim-link').on('click', function(e) {
    e.preventDefault();
    if (debug) {
      $('html').trigger('animation-start');
      setTimeout(function(){
        $('html').trigger('content-loaded');
      }, delay);
    }
  });

  $('html').on('animation-start', function() {
    $('html').addClass('is-animating animation-start');
    setTimeout(function(state){
      state.anim = true;
      $('html').trigger('page-ready');
      if (state.loaded) {
        $('html').addClass('content-loaded');
      }
    }, 2000, state);
  });

  $('html').on('content-loaded', function() {
    setTimeout(function(){
      state.loaded = true;
      if (state.anim) {
        $('html').addClass('content-loaded');
      }
      $('html').trigger('page-ready');
    }, 500);
  });

  $('html').on('page-ready', function(){
    if (state.anim && state.loaded) {
      setTimeout(function(){
        $('html').removeClass('content-loaded');
      }, 500);
      setTimeout(function(){
        $('html').addClass('animation-end');
      }, 1000);
      setTimeout(function() {
        $('html').removeClass('is-animating animation-start animation-end');
      }, 2500);
    }
  });

}

module.exports = {init};