/**
 * Переключение классов по различным событиям
 * @module Ymaps
 * Docs: https://tech.yandex.ru/maps/doc/jsapi/2.1/quick-start/index-docpage/
 */

function init() {
  
  let map = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.80433406892266,37.585969499999955],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 17
  });
  let mark = new ymaps.Placemark([55.80433406892266,37.585969499999955], {}, {
    iconLayout: 'default#image',
    iconImageHref: '/build/img/marker.png',
    iconImageSize: [60, 60],
    iconImageOffset: [-25, -80]
  });
  map.geoObjects.add(mark);
  map.behaviors.disable('scrollZoom');
}

 module.exports = {init};