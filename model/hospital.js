const mongoose = require('mongoose')

var hospital = new mongoose.Schema({
    hospital: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    beds_total: {
        type: Number,
        required: true
    },
    beds_occupied: {
        type: Number,
        required: true
    },
    beds_available: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Hospital = mongoose.model('Hospital', hospital)

module.exports = Hospital
