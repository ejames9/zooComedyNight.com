/*
kitten.js

This file creates and exports the Kitten test model for the
zooComedyNight.com web app..
*/

const
mongoose = require('mongoose'),
Schema   = mongoose.Schema,
Model    = mongoose.model;

var kittySchema = new Schema({
          name: String
        });

//
kittySchema.methods.speak = function() {
  var greeting = "Meow name is " + this.name;

  console.log(greeting);
}

var
Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;
