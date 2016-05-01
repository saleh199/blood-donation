/**
 * Created by saleh on 5/1/16.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    contact_number: {
        type: String,
        validate: {
            validator: function(value) {
                return /(\+|0{2})+([0-9]{2})+(([0-9]{10})|\s+([0-9]{3}\s[0-9]{4}\s[0-9]{3}))/g.test(value);
            }
        }
    },
    email: { type: String, required: true },
    blood_group: { type: String, required: true },
    ip: { type: String, required: true },
    coordinate: { type: [Number], index: '2d' }
});

mongoose.model('Donor', schema);