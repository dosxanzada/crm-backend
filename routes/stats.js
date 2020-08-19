const express = require('express')
const router = express.Router()

const { handleErrors } = require('../utils')

const { computeStats } = require('../controllers/stats')

router.post('/', computeStats, handleErrors)

module.exports = router
