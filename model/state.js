const mongoose = require('mongoose')
const Country = require('./country')
const states_data = require('../data/states.json')

var state = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    state: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
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
