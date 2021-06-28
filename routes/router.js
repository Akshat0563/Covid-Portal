const express = require('express')
const bodyParser = require('body-parser')
const user = require('../controller/controller')
const auth = require('../middleware/auth.js')

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/api/signIn',jsonParser, user.signIn)

router.post('/api/signUp',jsonParser, user.signUp)

router.get('/api/signOut', auth, user.signOut)

router.get('/api/signOutAll', auth, user.signOutAll)

module.exports = router