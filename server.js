var app = require('./server-config.js');

// var port = process.env.PORT || 4568;

// app.listen(port);

// console.log('Server now listening on port ' + port);

/////////////////////////////////
// Mongo implementation
/////////////////////////////////

// var express     = require('express'),
var mongoose = require('mongoose');

// var app = express();

mongoose.connect('mongodb://localhost/shortly'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;

