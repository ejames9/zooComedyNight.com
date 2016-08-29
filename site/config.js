/*
config.js

Configuration code for zooComedyNight.com
web app..
*/

var
path = require('path'),
env  = process.env.NODE_ENV || 'development',
port = process.env.PORT || 8181,
root = path.normalize(__dirname + '/..');



//Configuration object..
module.exports = {
            root: root,
             app: {
               name: 'zooComedyNight.com'
             },
            port: port,
              db: 'mongodb://localhost/' + env,
      cookiePass: 'trunk joined gun bean'
               };
