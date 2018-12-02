/**
 * Карусель
 * @module Carousel
 */

let carouselDef;

/**
 * Инициализация карусели
 */
function init(){
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

module.exports = {init};