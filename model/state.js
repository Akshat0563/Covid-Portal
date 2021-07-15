const mongoose = require('mongoose')

var state = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        unique: true
    },
    country: {
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

const State = mongoose.model('State', state)

module.exports = State
