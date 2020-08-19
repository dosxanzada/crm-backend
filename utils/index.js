const Users = require('../models/Users')

const handleErrors = (err, req, res, next) => {
  console.log('-----------------------------')
  console.log(new Date(), err)
  console.log('-----------------------------')
  res.status(err.status || 500).send({ errors: err.errors ? err.errors : err.message })
}

const setError = (status, msg, param, err) => {
  if (err) console.log(err)
  return {
    errors: {
      [param]: {
        msg
      }
    },
    message: msg,
    status
  }
}

const isAdmin = (req, res, next) => {
  if (req.payload && req.payload.admin) {
    next()
  } else {
    return res.status(403).send({ errors: {
      admin: {
        param: 'admin',
        msg: 'Бұл әрекетті админ ғана жасай алады'
      }
    }})
  }
}

const checkUser = (req, res, next) => {
  if (req.payload && req.payload._id) {
    Users.findById(req.payload._id).exec((err, user) => {
      if (err) return next(setError(500, err.message, 'user', err))
      if (!user) return next(setError(403, 'Мүмкіндік шектеулі', 'user'))
      next()
    })
  }
}

module.exports = {
  setError,
  handleErrors,
  isAdmin,
  checkUser
}
