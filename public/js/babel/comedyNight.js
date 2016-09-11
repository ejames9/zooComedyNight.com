"use strict";

/*
comedyNight.js

Client-side entry point javascript file for the zooComedyNight.com
web application..

Author: Eric James Foster
*/

//imports..


///-------Begin Module Imports---------///
var _$ = require("elementsJS")._$;
var el = require("elementsJS").el;
var dom = require("elementsJS").dom;
var make = require("elementsJS").make;
var element = require("elementsJS").element;
///|------------------------------------|//


var elementsJS = require("elementsJS");
var el = elementsJS.el;
var log = elementsJS.log;
var go = elementsJS.go;
var scroll = elementsJS.scroll;
var on = elementsJS.on;
var off = elementsJS.off;
var inspect = elementsJS.inspect;
var xhr = elementsJS.xhr;

///End Module requires///


//Header animation event-listener callback function..
function animateHeader() {
    //Cache elements..
    var _navBar_ = element(navBar),
        _navbar_ = element(navbar),
        _parallax_ = function () {
        var elem0 = _$('#parallax') ? dom('#parallax') : make('#parallax').put("body");
        return elem0;
    }(),
        _navLogo_ = function () {
        var elem1 = _$('#nav-logo') ? dom('#nav-logo') : make('#nav-logo').put("body");
        return elem1;
    }(),
        _chevrons_ = dom('[class~=chevron]');

    //If user has scrolled more than 10px, execute animation..
    if (_parallax_.scrolled() > 10) {
        (function () {
            //
            _navBar_.class('clearHeader', '-');
            _navLogo_.class('expandFont', '-');

            _navBar_.class('fillHeader', '+');
            _navLogo_.class('shrinkFont', '+');

            //Stop scroll indicator animation, otherwise user computer will explode..
            _chevrons_.every(function (chevron) {
                chevron.class('scrollIndicator', '-');
            });
            //
            setTimeout(function () {
                _navBar_.bgColor('#ede5d0');
                _navLogo_.color('#0b0b0b').fontSize('24px');
            }, 2000);

            //Remove event handler to smooth CSS Scroll animation..
            off('scroll', _parallax_.el, animateHeader);

            //Poll parallax element for scrolled value, reset header when below 10..
            var interval = setInterval(function () {
                //
                if (_parallax_.scrolled() < 50) {
                    //
                    _navBar_.class('fillHeader', '-');
                    _navLogo_.class('shrinkFont', '-');

                    _navBar_.class('clearHeader', '+');
                    _navLogo_.class('expandFont', '+');

                    //Restart scroll indicator animation..
                    _chevrons_.every(function (chevron) {
                        chevron.class('scrollIndicator', '+');
                    });
                    //
                    setTimeout(function () {
                        _navBar_.bgColor('transparent');
                        _navLogo_.color('#ede5d0').fontSize('30px');
                    }, 2000);

                    //Clear poller..
                    clearInterval(interval);
                    //Reset listener..
                    on('scroll', _parallax_.el, animateHeader);
                }
            }, 500);
        })();
    }
}

//DOM Ready Function..
go(function () {
    //
    var _parallax_ = el('#parallax');
    //Set listener on parallax container, because it is preventing the scroll event from bubbling..
    on('scroll', _parallax_, animateHeader);
});