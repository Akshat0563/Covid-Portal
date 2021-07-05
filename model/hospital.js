const mongoose = require('mongoose')
const hospitals_data = require('../data/hospitals.json')

var hospital = new mongoose.Schema({
    Hospital: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    Beds_total: {
        type: Number,
        required: true
    },
    Beds_occupied: {
        type: Number,
        required: true
    },
    Beds_available: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Hospital = mongoose.model('Hospital', hospital)

Hospital.insertMany(hospitals_data, (error, docs) => {})

module.exports = Hospital
