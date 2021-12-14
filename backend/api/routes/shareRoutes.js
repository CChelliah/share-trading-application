const express = require('express')
const router = express.Router()

const { shareController } = require('../controllers')

router.get('/custom', shareController.custom)

module.exports = router
