const mongoose = require('mongoose')
const countries_data = require('../data/countries.json')

var country = new mongoose.Schema({
    country: {
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

const Country = mongoose.model('Country', country)

//Country.insertMany(countries_data, (error, docs) => {})

module.exports = Country
