const mongoose = require('mongoose')
const districts_data = require('../data/districts.json')

var district = new mongoose.Schema({
    District: {
        type: String,
        required: true
    },
    District_Key: {
        type: String,
        required: true
    },
    State_Code: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Confirmed: {
        type: Number,
        required: true
    },
    Active: {
        type: Number,
        required: true
    },
    Recovered: {
        type: Number,
        required: true
    },
    Deaths: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const District = mongoose.model('District', district)

//District.insertMany(districts_data, (error, docs) => {})

module.exports = District
