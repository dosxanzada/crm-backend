require('../config/db')
const Users = require('../models/Users')

const STEP = process.env.STEP

const users = [
  {
    fullname: 'Админ Админұлы',
    email: 'admin@gmail.com',
    login: 'admin',
    department: 'IT',
    position: 'CEO',
    admin: true
  }
]

const initDB = () => {
  if (STEP === '1' || !STEP) {
    Users.findOne({ login: 'admin' }).exec((err, user) => {
      if (err) return console.log(err.message)
      if (user) return console.log('user exists')
      const newUser = new Users(users[0])
      newUser.setPassword('admin')
      newUser.save((err, savedUser) => {
        return console.log(`User saved: ${savedUser.fullname}`)
      })
    })
  }
}

initDB()
