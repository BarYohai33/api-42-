const express = require('express')
const router = express.Router()
const controller = require('./index.controller')

router.get('/list', controller.list)
router.get('/search/:criteria', controller.search)

module.exports = router
