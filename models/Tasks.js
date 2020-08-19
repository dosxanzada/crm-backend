const mongoose = require('mongoose')

// status: 0 - undefined, 1 - complete

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  deadline: {
    type: Date,
    required: true
  },
  comment: {
    type: String
  },
  complete: {
    status: {
      type: Boolean,
      default: false
    },
    date: Date
  },
  price: String
},
{
  timestamps: true
})

module.exports = mongoose.model('Tasks', Schema)
