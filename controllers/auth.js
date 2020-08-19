const passport = require('passport')
const { body, validationResult } = require('express-validator/check')

const { setError } = require('../utils')

const login = [
  body('email').exists().withMessage('Email енгізіңіз'),
  body('password').exists().withMessage('Құпия сөзді енгізіңіз'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() })
    }

    passport.authenticate('local', (err, user, info) => {
      let token
      if (err) return next(setError(500, err.message, 'passport', err))
      if (!user) return next(setError(400, info, 'user'))
      if (user) {
        token = user.generateJwt()
        res.status(200).send({ token, user })
      }
    })(req, res, next)
  }
]

module.exports = {
  login
}
