/**
 * Created by saleh on 5/1/16.
 */
'use strict';

var mongoose = require('mongoose');

var donor = mongoose.model('Donor', {
    first_name : String,
    last_name : String,
    contact_number : String,
    email : String,
    blood_group : String,
    ip: String,
    longitude : Number,
    latitude : Number
});