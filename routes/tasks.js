const express = require('express')
const router = express.Router()

const { handleErrors } = require('../utils')

const { getTasks, addTask, confirmTask } = require('../controllers/tasks')

router.get('/', getTasks, handleErrors)

router.post('/', addTask, handleErrors)

router.post('/confirm', confirmTask, handleErrors)

// router.post('/:taskId', confirmTask, handleErrors)

module.exports = router
