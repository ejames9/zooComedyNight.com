/*
comedyNight.js

Client-side entry point javascript file for the zooComedyNight.com
web application..

Author: Eric James Foster
*/



//imports..
use 'elementsJS' el, log, go, scroll, on, off, inspect, xhr, isMobile



//Set Outer looney toons cover height..
function setLooneyToonsCoverHeight() {
  <looneyToonsCover/>
                .height(windw.innerHeight + 'px');
}


//Set Slide heights..
function setCatHeadSlideHeights() {
  <'.item'/>
        .every((item)=> {
          item
            .height(window.innerHeight + 'px');
        });
}


//Header animation event-listener callback function..
function animateHeader() {
  //Cache elements..
  let _navBar_ = <navBar/>,
      _navbar_ = <navbar/>,
    _parallax_ = <'#parallax'/>,
     _navLogo_ = <'#nav-logo'/>,
    _chevrons_ = <'[class~=chevron]'/>;


   //If user has scrolled more than 10px, execute animation..
  if (_parallax_.scrolled() > 10) {
    //
    _navBar_
        .class('clearHeader', '-');
    _navLogo_
        .class('expandFont', '-');

    _navBar_
        .class('fillHeader', '+');
    _navLogo_
        .class('shrinkFont', '+');

    //Stop scroll indicator animation, otherwise user computer will explode..
    _chevrons_
        .every((chevron)=> {
          chevron
              .class('scrollIndicator', '-');
        });
    //
    setTimeout(()=> {
      _navBar_
          .bgColor('#ede5d0');
      _navLogo_
          .color('#0b0b0b')
          .fontSize('24px');
    }, 2000);


    //Remove event handler to smooth CSS Scroll animation..
    off('scroll', _parallax_.el, animateHeader);

    //Poll parallax element for scrolled value, reset header when below 10..
    let interval = setInterval(()=> {
      //
      if (_parallax_.scrolled() < 50) {
        //
        _navBar_
            .class('fillHeader', '-');
        _navLogo_
            .class('shrinkFont', '-');

        _navBar_
            .class('clearHeader', '+');
        _navLogo_
            .class('expandFont', '+');

        //Restart scroll indicator animation..
        _chevrons_
            .every((chevron)=> {
              chevron
                .class('scrollIndicator', '+');
            });
        //
        setTimeout(()=> {
          _navBar_
              .bgColor('transparent');
          _navLogo_
              .color('#ede5d0')
              .fontSize('30px');
        }, 2000);

        //Clear poller..
        clearInterval(interval);
        //Reset listener..
        on('scroll', _parallax_.el, animateHeader);
      }
    }, 500);
  }
}


//DOM Ready Function..
go
(function() {
  log(isMobile() === 'iPad');
  log(isMobile() == 'iPad');
  //
  if (isMobile()) {
    log('Device is mobile.');
    //
    setLooneyToonsCoverHeight();
    // xhr('/mobileConstruction');  TODO: Figure this out.....
    if (isMobile() != 'iPad') {
      location = '/construction';
    } else {
      log('Device is iPad');
    }
  }

  let _parallax_ = <'#parallax'>;
  //Set listener on parallax container, because it is preventing the scroll event from bubbling..
  on('scroll', _parallax_, animateHeader);

  //
  setCatHeadSlideHeights()
});
