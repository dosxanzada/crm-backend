const { body, validationResult } = require('express-validator/check')

const { setError } = require('../utils')

const Users = require('../models/Users')

const addUser = [
  body('fullname', 'Аты-жөнін толтыру міндетті').exists(),
  body('email').exists().withMessage('Email толтыру міндетті').isEmail().withMessage('Дұрыс Email енгізіңіз'),
  body('password').exists().withMessage('Құпия сөзді толтыру міндетті'),
  body('department').exists().withMessage('Бөлімді толтыру міндетті'),
  body('position').exists().withMessage('Лауазымды толтыру міндетті'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() })
    }

    Users.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) return next(setError(500, err.message, 'user'))
      if (user) return next(setError(400, 'Бұндай поштамен қызметкер тіркелген', 'user'))
      const newUser = new Users({
        ...req.body,
        head: req.payload._id
      })
      newUser.setPassword(req.body.password)

      newUser.save((err, user) => {
        if (err) return next(setError(500, err.message, 'user', err))
        res.status(200).send({
          message: 'Қызметкер қосылды',
          user
        })
      })
    })
  }
]

const getUsers = (req, res, next) => {
  Users.find().where('_id').ne(req.payload._id).lean().exec((err, users) => {
    if (err) return next(setError(500, err.message, 'user'))
    if (req.query.my) users = users.filter(user => (user.head && user.head.toString()) === req.payload._id)
    return res.status(200).send({ users })
  })
}

const getUser = (req, res, next) => {
  Users.findById(req.params.userId).exec((err, user) => {
    if (err) return next(setError(500, err.message, 'user', err))
    if (!user) return next(setError(404, 'Бұндай қызметкер табылмады', 'user'))
    res.status(200).send({ user })
  })
}

const editUser = (req, res, next) => {
  Users.findOne({ _id: req.params.userId }).exec((err, user) => {
    if (err) return next(setError(500, err.message, 'user', err))
    if (!user) return next(setError(404, 'Бұндай қызметкер табылмады', 'user'))

    user.fullname = req.body.fullname || user.fullname
    user.email = req.body.email || user.email
    user.department = req.body.department || user.department
    user.position = req.body.position || user.position
    user.birthday = req.body.birthday || user.birthday
    user.phone = req.body.phone || user.phone
    user.avatar = req.file.path

    if (req.body.password) user.setPassword(req.body.password)

    user.save((err, user) => {
      if (err) return next(setError(500, err.message, 'user', err))
      res.status(200).send({ message: 'Жаңа өзгерістер сақталды', user })
    })
  })
}

const deleteUser = (req, res, next) => {
  Users.findOneAndRemove({ _id: req.params.userId, head: req.payload._id }).exec((err, removed) => {
    if (err) return next(setError(500, err.message, 'user', err))
    if (!removed) return next(setError(404, 'Бұндай қызметкер табылмады', 'user'))

    res.status(200).send({ message: `Қызметкер жойылды: ${removed.email}` })
  })
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser
}
