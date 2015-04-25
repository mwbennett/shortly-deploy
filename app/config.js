var mongoose = require('mongoose');

mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/shortlydb';

// connect to mongo database named shortly
mongoose.connect(mongoURI);

var db = mongoose.connection;

module.exports = db;
