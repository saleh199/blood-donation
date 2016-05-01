/**
 * Created by saleh on 5/1/16.
 */
'use strict';

var app = require('express')();
var server = require('http').Server(app);
var socket = require('socket.io')(server);

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 3000;
app.set('port', port);

server.listen(port);
