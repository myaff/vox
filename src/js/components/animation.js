/**
 * Переключение классов по различным событиям
 * @module Animation
 */


function clearStyle (el) {
  $(el).css({"transform": ""});
}

function init () {

  if (Main.DeviceDetection.isMobile()) {
    $('.page-animate__item').each(function(index) {
      $(this).css({'margin-bottom': $('.project').eq(index).find('.project__info').outerHeight()});
    });
  }

  $('.anim-link').on('click', function(e) {
    e.preventDefault();
    $('html').addClass('is-animating animation-start');
    setTimeout(function(self){
      self.trigger('animation-done');
    }, 2000, $(this));
  });

  $('.anim-link').on('animation-done', function(){
    // request here
    // .on('success')
    $('html').addClass('animation-end');
    setTimeout(function() {
      $('html').removeClass('is-animating animation-start animation-end');
    }, 2000);
  });

}

module.exports = {init};