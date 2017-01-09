// global vairables and imported software
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pet = require('../models/pets.js');
var path = require('path');

// base url returns index.html from public foulder
router.get('/', function(req, res) {
    console.log('Base URL hit!!');
    Pet.find({}, function(err, userResults) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log('users: ' + userResults);
            res.sendFile(path.resolve('public/views/index.html'));
        }
    });
});

//handles get requests from clients and submits them to mongoDB
router.get('/getPets/', function(req, res) {
        console.log('looking for id' + req.params.id);

        Pet.find({}, function(err, userResults) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log('users: ' + userResults);
                res.send(userResults);
            }
        });
    });

//handles pull requests from clients ands ubmits them to mongoDB
router.post('/postPet', function(req, res) {
    console.log('posting data to DB!!!');
    //package new pet fro req.body using the pet.js schema
    var newPet = new Pet({
        name: req.body.name,
        animal: req.body.animal,
        age: req.body.age,
        image: req.body.image
    });
    //saves new pet to mongoDB
    newPet.save(function(err) {
        if (err) {
            console.log("erorr: " + err);
        } else {
            console.log("New pet posted.");
            res.sendStatus(201);
        }
    });
});

//makes router availble to server.js
module.exports = router;
