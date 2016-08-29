/*
router.js

This file creates and exports the application's routes to the
main app file.

Author: Eric James Foster
*/


//Instantiate Router..
const router = require('express').Router(),
        User = require('../models/users');


//Home page..
router.get('/', function(req, res) {
  res.render('home');
});

router.post('/', function(req, res) {
  if (req.body) {
    console.dir(req.body);

    var user = new User({
      userName: req.body.userName,
         email: req.body.email
    });

    user.save(function(err, user) {
      if (err) console.error(err);
      user.greet();
    });

    User.find(function(err, users) {
          if (err) return console.error(err);
          console.log(users);
        });
  }
  return res.redirect('/about');
});

//About page..
router.get('/about', function(req, res) {
  res.render('about');
});


module.exports = router;
