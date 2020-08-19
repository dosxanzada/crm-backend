const { body, validationResult } = require('express-validator/check')

const { setError } = require('../utils')

const Clients = require('../models/Clients')

const getClients = (req, res, next) => {
  Clients.find().populate('processedBy').exec((err, clients) => {
    if (err) return next(setError(500, err.message, 'clients', err))
    res.status(200).send({ clients })
  })
}

const addClient = [
  body('fullname').exists().withMessage('Поле Полное Имя (\'fullname\') обязательно для заполнения'),
  body('processedBy').exists().withMessage('Поле Кем Обработан (\'processedBy\') обязательно для заполнения'),
  body('email').exists().withMessage('Поле Почта (\'email\') обязательно для заполнения'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() })
    }

    Clients.create(req.body, (err, client) => {
      if (err) return next(setError(500, err.message, 'clients', err))
      res.status(200).send({ message: 'Клиент создан', client })
    })
  }
]

module.exports = {
  getClients,
  addClient
}
