const express = require('express');
const router = express.Router();
const user = require('../controller/controller');


router.post('/api/signIn', user.signIn);

router.post('/api/signUp', user.signUp);

module.exports = router