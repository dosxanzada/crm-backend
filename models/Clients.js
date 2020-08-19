const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
})

module.exports = mongoose.model('Clients', Schema)
