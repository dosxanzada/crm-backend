const express = require('express')
const router = express.Router()

const { checkUser } = require('../utils')

const authRoute = require('./auth')
const usersRoute = require('./users')
const newsRoute = require('./news')
const tasksRoute = require('./tasks')
const clientsRoute = require('./clients')
const statsRoute = require('./stats')

router.use('/auth', authRoute)

router.use('/users', checkUser, usersRoute)

router.use('/news', checkUser, newsRoute)

router.use('/tasks', checkUser, tasksRoute)

router.use('/clients', checkUser, clientsRoute)

router.use('/stats', checkUser, statsRoute)

router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('invalid token...')
  }
  res.status(500).send({ message: err.message })
})

module.exports = router
