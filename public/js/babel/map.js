"use strict";

/*
map.js

Client-side entry point javascript file for adding a map to the zooComedyNight.com
web application's contact page..

Amur location: [136.166667, 45.333333]

Author: Eric James Foster
*/

///-------Begin Module Imports---------///
var _$ = require("elementsJS")._$;
var el = require("elementsJS").el;
var dom = require("elementsJS").dom;
var make = require("elementsJS").make;
var element = require("elementsJS").element;
///|------------------------------------|//


var elementsJS = require("elementsJS");
var go = elementsJS.go;
var inspect = elementsJS.inspect;
var log = elementsJS.log;

///End Module requires///


//Add a marker to map, convenience function..
function addMarker(elem, offset, map, coordinates) {
  var marker = new mapboxgl.Marker(elem.el, { offset: offset }).setLngLat(coordinates).addTo(map);
}

//Initialize Mapbox Map..
go(function () {
  //API Token
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWphbWVzOSIsImEiOiIyNGNlYWUyYTU4M2Q4YTViYWM0YTBlMDRmNzIyMTYyNCJ9.RbU_-nlAAF6EOSVxj1kVMg';
  //
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ejames9/cistatqw0000t2ytckscvzpor',
    center: [-122.7159, 45.5100],
    zoom: 13,
    pitch: 55,
    hash: true,
    attributionControl: false
  });
  //Set load listener..
  map.on('load', function () {
    document.body.removeChild(el('#loading-animation'));
  });

  //Create marker markup..
  var _div_ = make('#zooMarker-container'),
      _png_ = make('#zooMarker', 'img');
  //Append marker image to marker container..
  _png_.src('img/zooMarker5.png').height('60px').width('47px').put(_div_.el);
  //Place marker on Zoo..
  addMarker(_div_, [0, -55], map, [-122.7159, 45.5100]);
});