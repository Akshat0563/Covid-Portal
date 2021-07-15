const mongoose = require('mongoose')

var guideline = new mongoose.Schema({
	guideline: {
		type: String,
		required: true
	}
}, {timestamps:true})

const Guideline = mongoose.model('Guideline', guideline)

module.exports = Guideline