const mongoose = require('mongoose')
const hospitals_data = require('../data/hospitals.json')

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

//Hospital.insertMany(hospitals_data, (error, docs) => {})

module.exports = Hospital
