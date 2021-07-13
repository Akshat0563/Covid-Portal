const mongoose = require('mongoose')
const districts_data = require('../data/districts.json')

var district = new mongoose.Schema({
    district: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    confirmed: {
        type: Number,
        required: true
    },
    active: {
        type: Number,
        required: true
    },
    recovered: {
        type: Number,
        required: true
    },
    deaths: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const District = mongoose.model('District', district)

//District.insertMany(districts_data, (error, docs) => {})

module.exports = District
