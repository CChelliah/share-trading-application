const express = require('express')
const router = express.Router()

const { shareController } = require('../controllers')

router.post('/custom', shareController.custom)

module.exports = router
