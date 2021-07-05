const mongoose = require('mongoose')
const countries_data = require('../data/countries.json')

var country = new mongoose.Schema({
    Country: {
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

const Country = mongoose.model('Country', country)

Country.insertMany(countries_data, (error, docs) => {})

module.exports = Country
