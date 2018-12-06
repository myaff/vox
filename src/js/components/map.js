/**
 * Переключение классов по различным событиям
 * @module Ymaps
 * Docs: https://tech.yandex.ru/maps/doc/jsapi/2.1/quick-start/index-docpage/
 */

function init() {
  
  if ($('#contact-map').length) {
    let contactsMapId = "contact-map";
    let contactsMapCoord = $(`#${contactsMapId}`).data('center').split(",");
    let contactsMap = new ymaps.Map(contactsMapId, {
      center: contactsMapCoord,
      zoom: 17
    });
    contactsMap.behaviors.disable('scrollZoom');
    if ($(`#${contactsMapId}`).data('placemark')) {
      let contactsMapPlacemarkCoord = $(`#${contactsMapId}`).data('placemark').split(",");
      let contactsMapPlacemark = new ymaps.Placemark(contactsMapPlacemarkCoord, {}, {
        iconLayout: 'default#image',
        iconImageHref: '/build/img/marker.png',
        iconImageSize: [60, 60],
        iconImageOffset: [-25, -80]
      });
      contactsMap.geoObjects.add(contactsMapPlacemark);
    }
  }

  if ($('#about-map').length) {
    let aboutMapId = "about-map";
    let aboutMapCoord = $(`#${aboutMapId}`).data('center').split(",");
    let aboutMap = new ymaps.Map(aboutMapId, {
      center: aboutMapCoord,
      zoom: 17
    });
    aboutMap.behaviors.disable('scrollZoom');
    if ($(`#${aboutMapId}`).data('placemark')) {
      let aboutMapPlacemarkCoord = $(`#${aboutMapId}`).data('placemark').split(",");
      let aboutMapPlacemark = new ymaps.Placemark(aboutMapPlacemarkCoord, {}, {
        iconLayout: 'default#image',
        iconImageHref: '/build/img/marker-2.png',
        iconImageSize: [28, 72],
        iconImageOffset: [-14, -85]
      });
      aboutMap.geoObjects.add(aboutMapPlacemark);
    }
  }
}

 module.exports = {init};