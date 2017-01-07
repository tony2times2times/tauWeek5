var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var scoreRouter = require('./routes/scoreRouter.js');
var indexRouter = require('./routes/index.js');
var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

app.use(bodyParser.json());

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

app.listen('2017', function(){
  console.log('listening on 2017');
});
app.use('/', indexRouter);
app.use('/score', scoreRouter);

app.use(express.static('public'));
