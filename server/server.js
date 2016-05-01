/**
 * Created by saleh on 5/1/16.
 */
'use strict';

var express = require('express');
var http = require('http');

var app = express();

var server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 3000;
app.set('port', port);

server.listen(port);
