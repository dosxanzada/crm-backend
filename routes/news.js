const express = require('express')
const router = express.Router()

const { setError } = require('../utils')

const News = require('../models/News')

router.get('/', (req, res, next) => {
  News.find().exec((err, news) => {
    if (err) return next(setError(500, err.message, 'news', err))
    res.status(200).send({ news })
  })
})

module.exports = router
