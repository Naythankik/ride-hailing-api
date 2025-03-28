const express = require('express');

const router = express.Router();

router.get('/users');
router.get('/rides');
router.get('/payments');

router.put('/block/:userId');
router.delete('/delete/:userId');

module.exports = router;

