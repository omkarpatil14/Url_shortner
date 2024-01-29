const express = require('express');
const { handleUserSignUp, handleUserSignIn } = require('../controller/user');
const router = express.Router();

router.post('/', handleUserSignUp)
router.post('/login', handleUserSignIn);

module.exports = router;