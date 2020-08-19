const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  hash: String,
  salt: String,
  phone: String,
  department: String,
  position: String,
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  admin: {
    type: Boolean,
    default: false
  },
  birthday: Date,
  avatar: String
}, {
  timestamps: true
})

// Функция для создания пароля
Schema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

// Функция для проверки валидности пароля
Schema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.hash === hash
}

// const secret = process.env.SECRET // будем брать наш секретный ключ из переменной среды
const secret = 'shhhhhhared-secret' // будем брать наш секретный ключ из переменной среды

// генерирует JsonWebToken, ставит срок истечения на 365 дней
Schema.methods.generateJwt = function () {
  var expiry = new Date()
  expiry.setDate(expiry.getDate() + 365)

  return jwt.sign({
    _id: this._id,
    email: this.email,
    fullname: escape(this.fullname),
    department: escape(this.department),
    position: escape(this.position),
    admin: this.admin,
    exp: parseInt(expiry.getTime() / 1000)
  }, secret)
}

module.exports = mongoose.model('Users', Schema)
