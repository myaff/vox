/**
 * Модуль для работы placeholder в элементах формы (.field)
 * @module Input
 */


/**
 * Установить фокус
 * @private
 * @param {object} input
 */
function focusLabel(input){
    input.closest('.field').addClass("has-focus");
}

/**
 * Убрать фокус
 * @private
 * @param {object} input
 */
function blurLabel(input){
    var wrapper = input.closest('.field');
    wrapper.removeClass("has-focus");
}

/**
 * Проверить инпут на наличие value
 * @private
 * @param {object} input
 */
function checkInput(input){
    var wrapper = input.closest('.field');
    if (input.val().length > 0)
        wrapper.addClass("has-value");
    else
        wrapper.removeClass("has-value");
}

/**
 * инициализация событий для инпута
 * @example
 * Input.init();
 */
function init(){
    let inputs = $('.field__input');
    let placeholders = $('.field__placeholder');
    let flow = $('.flow-textarea');
    
    placeholders.click(function(){
      $(this).closest('.field').find('.field__input').focus();
    });

    inputs.each(function(i, item) {
        checkInput($(item));
    });

    inputs.focus(function(){
        focusLabel($(this));
    });

    inputs.blur(function(){
        blurLabel($(this));
        checkInput($(this));
    });

    $('.btn-search').on('click', function(e){
        e.preventDefault();
        $('#search').focus();
    });

    flow.on('keydown', function(){
        $(this).change();
    });

    flow.on('change', function(){
        setTimeout(function(self){
            let flowEx = $(self).siblings('.flow-textarea-example');
            flowEx.html($(self).val().replace(/\r?\n/g,'<br/>'));
            if (flow.outerHeight() !== flowEx.outerHeight()) {
                flow.stop().animate({'height': flowEx.outerHeight()}, 300);
            }
        }, 10, this);
    });
}

module.exports = {init};