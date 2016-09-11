/*
users.js

This file creates and exports the User model for the
zooComedyNight.com web app..
*/

const
mongoose = require('mongoose'),
Schema   = mongoose.Schema;


var usersSchema = new Schema({
                        userName: String,
                           email: String
                      });

//
usersSchema.methods.greet = function() {
  var greeting = 'Well hello ' + this.userName + '!\nYou\'re email address is: ' + this.email;

  console.log(greeting);
}

var
User = mongoose.model('User', usersSchema);

module.exports = User;
