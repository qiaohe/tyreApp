var mongoose = require('mongoose');
var config = require('./../config');
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.database);
var db = mongoose.connection;

db.on('error', function () {
    console.log('error occurs from db');
});

db.once('open', function dbOpen() {
    console.log('open database successfully.');
});

exports.mongoose = mongoose;
