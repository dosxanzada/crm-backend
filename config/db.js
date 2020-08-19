const mongoose = require('mongoose')
var dbUrl = 'mongodb://localhost:27017/diplom'

mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => console.log(`connected to ${dbUrl}`))
mongoose.connection.on('error', err => console.log(`error: ${err}`))
mongoose.connection.on('disconnected', () => console.log(`disconnected`))
