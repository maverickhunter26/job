console.log('mongodb....');
var mongoose = require('mongoose');
var configure = require('./configure');

//mongoose.connect(configure.creds.mongodb);

mongoose.connect('mongodb://jobs:jobs123@ds045978.mongolab.com:45978/jobs');

mongoose.connection.on('connected', function () {
  console.log('MOngodb connection open to ' + configure.creds.mongodb);
  //require('./model');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('MOngodb connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('MOngodb connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('MOngodb connection disconnected through app termination');
    process.exit(0);
  });
});

//require('./model');