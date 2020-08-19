const { body, validationResult } = require('express-validator/check')

const Tasks = require('../models/Tasks')
const Users = require('../models/Users')

const { setError } = require('../utils')

const getTasks = (req, res, next) => {
  Tasks.find({ $or: [{ from: req.payload._id }, { to: req.payload._id }] }).sort('-createdAt').populate('from to').exec((err, tasks) => {
    if (err) return next(setError(500, err.message, 'task', err))
    res.status(200).send({ tasks })
  })
}

const addTask = [
  body('title').exists().withMessage('Тақырыпты енгізу міндетті'),
  body('text').exists().withMessage('Сипаттаманы енгізу міндетті'),
  body('to').exists().withMessage('Жауаптыны енгізу міндетті'),
  body('deadline').exists().withMessage('Орындау уақытын енгізу міндетті'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() })
    }
    if (req.body.to === req.payload._id) return next(setError(400, 'Өз өзіңізге тапсырма қоюға болмайды', 'task'))
    Users.findOne({ _id: req.body.to, head: req.payload._id }).exec((err, user) => {
      if (err) return next(setError(500, err.message, 'user', err))
      if (!user) return next(setError(404, 'Бұндай қызметкер табылмады', 'user', err))
      const task = new Tasks(req.body)
      task.from = req.payload._id
      task.save((err, task) => {
        if (err) return next(setError(500, err.message, 'task', err))
        res.status(200).send({ message: 'Тапсырма сақталды', task })
      })
    })
  }
]

const confirmTask = (req, res, next) => {
  Tasks.findOne({ _id: req.body.taskId, to: req.payload._id }).populate('from to').exec((err, task) => {
    if (err) return next(setError(500, err.message, 'task', err))
    if (!task) return next(setError(404, 'Бұндай тапсырма табылмады', 'task'))
    task.complete.status = true
    task.complete.date = new Date()
    task.save((err, task) => {
      if (err) return next(setError(500, err.message, 'task', err))
      res.status(200).send({ message: 'Тапсырма орандалды', task })
    })
  })
}

module.exports = {
  getTasks,
  addTask,
  confirmTask
}
