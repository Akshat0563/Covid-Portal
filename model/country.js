const mongoose = require('mongoose')

var country = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        unique: true
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

module.exports = Country
