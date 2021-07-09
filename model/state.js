const mongoose = require('mongoose')
const states_data = require('../data/states.json')

var state = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
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

const State = mongoose.model('State', state)

//State.insertMany(states_data, (error, docs) => {})

module.exports = State
