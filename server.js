var app = require('./server-config.js');

var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);

/////////////////////////////////
// Mongo implementation
/////////////////////////////////

// var express     = require('express'),


// configure our server with all the middleware and and routing
// require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
// module.exports = app;

