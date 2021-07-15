const mongoose = require('mongoose')

var district = new mongoose.Schema({
    district: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = District
