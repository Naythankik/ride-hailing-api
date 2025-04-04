const express = require('express');
const { register, login, verifyAccount, requestVerification, forgotPassword, resetPassword } = require("../src/controllers/authenticationController");

const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.post('/verify-account/:token', verifyAccount)
router.post('/request-verification', requestVerification)
router.post('/forget-password', forgotPassword)
router.post('/reset-password', resetPassword)


module.exports = router;
