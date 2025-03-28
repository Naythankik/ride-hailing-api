const express = require('express');

const router = express.Router();

router.post('/register');
router.post('/login')
router.post('/verify-account/:token')
router.post('/request-verification')
router.post('/forget-password')
router.post('/reset-password')


module.exports = router;
