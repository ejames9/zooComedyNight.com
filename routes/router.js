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
  console.log('Device is mobile.');

  return res.redirect(301, '/construction');
});

//Map page..
router.get('/map', function(req, res) {
  res.render('map');
});

//Archives page..
router.get('/archives', function(req, res) {
  res.render('archives');
});

//mobileConstruction page..
router.get('/mobileConstruction', function(req, res) {
  console.log('Device is mobile');
  res.redirect('/map');
});

//mobileConstruction page..
router.get('/construction', function(req, res) {
  res.render('construction');
});


module.exports = router;
