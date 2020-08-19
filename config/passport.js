const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/Users')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, done) => {
  Users.findOne({ email }, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false, 'Бұндай пайдаланушы табылмады')
    if (!user.validPassword(password)) return done(null, false, 'Пошта немесе құпия сөз дұрыс емес')
    return done(null, user)
  })
}))
