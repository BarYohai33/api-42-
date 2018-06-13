const express = require('express')
const router = express.Router()
const controller = require('./index.controller')

router.post('/create', controller.create)
router.get('/read/:id', controller.read)
router.put('/update/:id', controller.update)
router.delete('/delete/:id', controller.delete)

module.exports = router
