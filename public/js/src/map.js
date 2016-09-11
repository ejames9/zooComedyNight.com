/*
map.js

Client-side entry point javascript file for adding a map to the zooComedyNight.com
web application's contact page..

Amur location: [136.166667, 45.333333]

Author: Eric James Foster
*/

use 'elementsJS' go, inspect, log


//Add a marker to map, convenience function..
function addMarker(elem, offset, map, coordinates) {
  let
  marker = new mapboxgl.Marker(elem.el, {offset: offset})
                          .setLngLat(coordinates)
                          .addTo(map);
}

//Initialize Mapbox Map..
go
(function() {
  //API Token
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWphbWVzOSIsImEiOiIyNGNlYWUyYTU4M2Q4YTViYWM0YTBlMDRmNzIyMTYyNCJ9.RbU_-nlAAF6EOSVxj1kVMg';
  //
  const map = new mapboxgl.Map({
         container: 'map',
             style: 'mapbox://styles/ejames9/cistatqw0000t2ytckscvzpor',
            center: [-122.7159, 45.5100],
              zoom: 13,
             pitch: 55,
              hash: true,
attributionControl: false
  });
  //Set load listener..
  map.on('load', ()=> {
    document.body.removeChild(<'#loading-animation'>);
  });

  //Create marker markup..
  let
  _div_ = make('#zooMarker-container'),
  _png_ = make('#zooMarker', 'img');
  //Append marker image to marker container..
  _png_
     .src('img/zooMarker5.png')
     .height('60px')
     .width('47px')
     .put(_div_.el);
  //Place marker on Zoo..
  addMarker(_div_, [0, -55], map, [-122.7159, 45.5100]);
});
