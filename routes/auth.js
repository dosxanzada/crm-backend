const express = require('express')
const router = express.Router()
const { handleErrors } = require('../utils')

const { login } = require('../controllers/auth')

router.post('/login', login, handleErrors)

module.exports = router
