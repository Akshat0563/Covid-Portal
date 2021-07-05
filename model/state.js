const mongoose = require('mongoose')
const states_data = require('../data/states.json')

var state = new mongoose.Schema({
    State: {
        type: String,
        required: true
    },
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

const State = mongoose.model('State', state)

State.insertMany(states_data, (error, docs) => {})

module.exports = State
