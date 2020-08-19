const express = require('express')
const router = express.Router()

const { handleErrors } = require('../utils')

const { getClients, addClient } = require('../controllers/clients')

router.get('/', getClients, handleErrors)

router.post('/', addClient, handleErrors)

module.exports = router
