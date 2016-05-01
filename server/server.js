/**
 * Created by saleh on 5/1/16.
 */
'use strict';

var app = require('express')();
var server = require('http').Server(app);
var socket = require('socket.io')(server);

// Express middleware
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');

var mongoose = require('mongoose');
require('./schema/donor');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(expressValidator({
    customValidators: {
        isValidBloodGroup: function(value){ // Custom validator for blood_group
            return ['o-', 'o+', 'ab-', 'ab+', 'b-', 'b+', 'a-', 'a+'].indexOf(value.toLowerCase()) !== -1;
        }
    }
}));
app.enable('trust proxy'); // Enable trust proxy

var Donor = mongoose.model('Donor');

/**
 * DB connection
 */
var db_uri = process.env.MONGO_URI || 'mongodb://localhost/blood-donation';
mongoose.connect(db_uri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('MongoDB connected to : ' + db_uri);
});

// Single Page Application
app.get('/', function(req, res){
    // TODO send html page
});

app.get('/donors', function(req, res){
    // Get all donors
    Donor.find({}, function(err, data){
        return res.json({
            error: false,
            errors: null,
            result: data
        });
    });
});

// Add new donor
app.post('/donors', function(req, res){

    // Validate data
    req.checkBody({
        first_name: { notEmpty: true },
        last_name: { notEmpty: true },
        contact_number: { notEmpty: true },
        email: { notEmpty: true, isEmail: true },
        blood_group: { isValidBloodGroup: true /* Custom validator */ },
        longitude: { notEmpty: true, isNumeric : true },
        latitude: { notEmpty: true, isNumeric : true }
    });

    var errors = req.validationErrors(); // Validate errors

    if(errors){
        res.status(400).json({
            error: true,
            result: null,
            errors : errors
        });
        return;
    }

    var donorData = req.body;
    donorData.ip = req.ip;
    donorData.coordinate = [donorData.longitude, donorData.latitude];

    delete donorData.longitude;
    delete donorData.latitude;

    var donor = new Donor(donorData);

    // Save data
    donor.save(function(err){
        if(err) {
            return res.status(400).json(err);
        }

        return res.json({
            error: false,
            result: donor,
            errors: []
        });
    });
});

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || 3000;
app.set('port', port);

server.listen(port);
