const express = require('express');
const { register, login, verifyAccount, requestVerification} = require("../src/controllers/authenticationController");

const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.post('/verify-account/:token', verifyAccount)
router.post('/request-verification', requestVerification)
router.post('/forget-password')
router.post('/reset-password')


module.exports = router;
