/**
 * Created by saleh on 5/1/16.
 */
'use strict';

var app = require('express')();
var server = require('http').Server(app);
var socket = require('socket.io')(server);
var mongoose = require('mongoose');

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

// Add new post
app.post('/add', function(req, res){
    
});

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || 3000;
app.set('port', port);

server.listen(port);
