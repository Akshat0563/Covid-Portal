const mongoose = require('mongoose')

var guideline = new mongoose.Schema({
  Guideline: {
   type: String
  }
})

const Guideline = mongoose.model('Guideline', guideline)

module.exports = Guideline