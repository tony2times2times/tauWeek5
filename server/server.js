var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routes/router.js');
var mongoURI = "mongodb://localhost:27017/pets";
var MongoDB = mongoose.connect(mongoURI).connection;

app.use(bodyParser.json());

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

app.listen('2305', function(){
  console.log('listening on 2305');
});

app.use('/', router);

app.use(express.static('public'));
