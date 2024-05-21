const mongoose = require('mongoose')

module.exports = mongoose.model(
  'ads',
  new mongoose.Schema({}, { strict: false })
)
//test
