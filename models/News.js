const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
//   id: {
//     type: Number,
//     default: 1,
//     unique: true
//   },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  fullBody: String,
  date: {
    type: Date,
    required: true
  },
  images: [{
    type: String
  }]
})

module.exports = mongoose.model('News', Schema)
